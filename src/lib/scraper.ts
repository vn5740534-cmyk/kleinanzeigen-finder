import axios, { AxiosInstance } from 'axios';
import * as cheerio from 'cheerio';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import type { Listing, SearchParams, ScraperConfig } from '@/types';

export class KleinanzeigenScraper {
  private config: ScraperConfig;
  private client: AxiosInstance;
  private rateLimiter: RateLimiterMemory;

  constructor(config: ScraperConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'User-Agent': config.userAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      },
      timeout: 30000,
    });

    this.rateLimiter = new RateLimiterMemory({
      points: config.maxRequestsPerMinute,
      duration: 60,
    });
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest(url: string): Promise<string> {
    await this.rateLimiter.consume(1);
    await this.delay(this.config.requestDelayMs);
    
    try {
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  private parsePrice(priceText: string): number | null {
    if (!priceText || priceText.toLowerCase().includes('verschenken') || priceText.toLowerCase() === 'zu verschenken') {
      return null;
    }
    
    const match = priceText.match(/(\d+(?:[.,]\d+)?)/);
    if (match) {
      return parseFloat(match[1].replace(',', '.'));
    }
    return null;
  }

  private parseListing($: cheerio.CheerioAPI, element: any, baseUrl: string): Listing | null {
    try {
      const $el = $(element);
      const titleEl = $el.find('a[class*="ellipsis"]');
      const title = titleEl.text().trim();
      const relativeUrl = titleEl.attr('href');
      
      if (!title || !relativeUrl) return null;

      const url = relativeUrl.startsWith('http') ? relativeUrl : `${baseUrl}${relativeUrl}`;
      const id = relativeUrl.split('/').pop()?.split('-').pop() || '';
      
      const priceEl = $el.find('[class*="price"]');
      const priceText = priceEl.text().trim();
      const price = this.parsePrice(priceText);
      
      const descriptionEl = $el.find('[class*="description"]');
      const description = descriptionEl.text().trim();
      
      const locationEl = $el.find('[class*="location"]');
      const location = locationEl.text().trim();
      
      const imgEl = $el.find('img');
      const image = imgEl.attr('src') || imgEl.attr('data-src');

      return {
        id,
        title,
        price,
        description,
        location,
        image,
        url,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error parsing listing:', error);
      return null;
    }
  }

  private buildSearchUrl(params: SearchParams, categoryQuery: string): string {
    const { city, radius } = params;
    // Build URL based on Kleinanzeigen.de structure
    // Format: /s-{category}/l{cityId}r{radius}/{searchQuery}
    
    // For simplicity, we'll use a general search
    const searchQuery = encodeURIComponent(categoryQuery);
    return `/s-anzeigen/l${city}r${radius}/${searchQuery}`;
  }

  private matchesKeywords(listing: Listing, keywords: string[]): boolean {
    if (keywords.length === 0) return true;
    
    const searchText = `${listing.title} ${listing.description}`.toLowerCase();
    return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  }

  private matchesElectronicsKeywords(listing: Listing): boolean {
    const searchText = `${listing.title} ${listing.description}`.toLowerCase();
    const keywords = [
      'hibátlanul működik', // Hungarian: works flawlessly
      'einwandfrei', // German: flawless
      'funktioniert einwandfrei', // German: works flawlessly
      'tadellos', // German: impeccable
      'perfekt funktionierend', // German: works perfectly
    ];
    
    return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
  }

  async search(params: SearchParams): Promise<Listing[]> {
    const allListings: Listing[] = [];
    const queries: string[] = [];

    // Build search queries based on enabled categories
    if (params.categories.freeItems) {
      queries.push('zu verschenken');
    }

    if (params.categories.dishwashers) {
      queries.push('geschirrspüler');
      queries.push('spülmaschine');
    }

    if (params.categories.washingMachines) {
      queries.push('waschmaschine');
    }

    if (params.categories.chesterfieldSofas) {
      queries.push('chesterfield sofa');
      queries.push('chesterfield couch');
    }

    if (params.categories.chairs) {
      queries.push('stühle');
      queries.push('stuhl');
    }

    if (params.categories.freeKitchens) {
      queries.push('küche zu verschenken');
    }

    if (params.categories.electronics) {
      queries.push('elektronik');
      queries.push('elektrogeräte');
    }

    // If no categories selected, do a general search
    if (queries.length === 0) {
      queries.push('');
    }

    // Search each category
    for (const query of queries) {
      try {
        const url = this.buildSearchUrl(params, query);
        const html = await this.makeRequest(url);
        const $ = cheerio.load(html);
        
        // Find listing elements - these selectors may need adjustment based on actual site structure
        const listingElements = $('article, [class*="aditem"], [class*="ad-listitem"]').toArray();
        
        for (const element of listingElements) {
          const listing = this.parseListing($, element, this.config.baseUrl);
          
          if (!listing) continue;

          // Apply filters
          if (params.categories.freeItems && listing.price !== null) continue;
          if (params.categories.dishwashers && listing.price && listing.price > params.maxPrices.dishwashers) continue;
          if (params.categories.washingMachines && listing.price && listing.price > params.maxPrices.washingMachines) continue;
          if (params.categories.electronics && !this.matchesElectronicsKeywords(listing)) continue;
          if (!this.matchesKeywords(listing, params.keywords)) continue;

          // Avoid duplicates
          if (!allListings.some(l => l.id === listing.id)) {
            allListings.push(listing);
          }
        }
      } catch (error) {
        console.error(`Error searching for "${query}":`, error);
        // Continue with other queries
      }
    }

    return allListings;
  }

  // Mock method for development/testing
  async searchMock(params: SearchParams): Promise<Listing[]> {
    // Simulate delay
    await this.delay(1000);

    const mockListings: Listing[] = [
      {
        id: '1',
        title: 'Geschirrspüler Bosch - einwandfrei',
        price: 45,
        description: 'Gut erhaltener Geschirrspüler, funktioniert einwandfrei. Nur Abholung.',
        location: 'Berlin Mitte',
        image: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Dishwasher',
        url: 'https://www.kleinanzeigen.de/s-anzeige/geschirrspueler-bosch/1',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Waschmaschine Siemens zu verkaufen',
        price: 50,
        description: 'Waschmaschine in gutem Zustand, 7kg Fassungsvermögen.',
        location: 'Berlin Kreuzberg',
        image: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Washing+Machine',
        url: 'https://www.kleinanzeigen.de/s-anzeige/waschmaschine-siemens/2',
        createdAt: new Date().toISOString(),
      },
      {
        id: '3',
        title: 'Chesterfield Sofa - Leder braun',
        price: 350,
        description: 'Klassisches Chesterfield Sofa aus echtem Leder, braun, 3-Sitzer.',
        location: 'Berlin Charlottenburg',
        image: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Chesterfield+Sofa',
        url: 'https://www.kleinanzeigen.de/s-anzeige/chesterfield-sofa/3',
        createdAt: new Date().toISOString(),
      },
      {
        id: '4',
        title: 'Kostenlose Stühle zu verschenken',
        price: null,
        description: 'Vier Stühle kostenlos abzugeben. Kleine Gebrauchsspuren.',
        location: 'Berlin Neukölln',
        image: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=Free+Chairs',
        url: 'https://www.kleinanzeigen.de/s-anzeige/stuehle-zu-verschenken/4',
        createdAt: new Date().toISOString(),
      },
      {
        id: '5',
        title: 'Küche komplett zu verschenken',
        price: null,
        description: 'Komplette Küchenzeile abzugeben. Selbstabbau erforderlich.',
        location: 'Berlin Pankow',
        image: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Free+Kitchen',
        url: 'https://www.kleinanzeigen.de/s-anzeige/kueche-zu-verschenken/5',
        createdAt: new Date().toISOString(),
      },
      {
        id: '6',
        title: 'Laptop hibátlanul működik',
        price: 200,
        description: 'Használt laptop, hibátlanul működik, jó állapotban.',
        location: 'Berlin Friedrichshain',
        image: 'https://via.placeholder.com/300x200/06B6D4/FFFFFF?text=Electronics',
        url: 'https://www.kleinanzeigen.de/s-anzeige/laptop/6',
        createdAt: new Date().toISOString(),
      },
    ];

    // Apply filters
    return mockListings.filter(listing => {
      if (params.categories.freeItems && listing.price !== null) return false;
      if (params.categories.dishwashers && !listing.title.toLowerCase().includes('geschirrspüler') && !listing.title.toLowerCase().includes('spülmaschine')) return false;
      if (params.categories.dishwashers && listing.price && listing.price > params.maxPrices.dishwashers) return false;
      if (params.categories.washingMachines && !listing.title.toLowerCase().includes('waschmaschine')) return false;
      if (params.categories.washingMachines && listing.price && listing.price > params.maxPrices.washingMachines) return false;
      if (params.categories.chesterfieldSofas && !listing.title.toLowerCase().includes('chesterfield')) return false;
      if (params.categories.chairs && !listing.title.toLowerCase().includes('stühl') && !listing.title.toLowerCase().includes('stuhl')) return false;
      if (params.categories.freeKitchens && (!listing.title.toLowerCase().includes('küche') || listing.price !== null)) return false;
      if (params.categories.electronics && !this.matchesElectronicsKeywords(listing)) return false;
      if (!this.matchesKeywords(listing, params.keywords)) return false;
      
      return true;
    });
  }
}

export function createScraper(): KleinanzeigenScraper {
  const config: ScraperConfig = {
    baseUrl: process.env.KLEINANZEIGEN_BASE_URL || 'https://www.kleinanzeigen.de',
    userAgent: process.env.USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    requestDelayMs: parseInt(process.env.REQUEST_DELAY_MS || '2000', 10),
    maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '20', 10),
  };
  
  return new KleinanzeigenScraper(config);
}
