export interface Listing {
  id: string;
  title: string;
  price: number | null; // null for free items
  description: string;
  location: string;
  image?: string;
  url: string;
  createdAt?: string;
}

export interface SearchParams {
  city: string;
  radius: number; // in km
  categories: {
    freeItems: boolean;
    dishwashers: boolean;
    washingMachines: boolean;
    chesterfieldSofas: boolean;
    chairs: boolean;
    freeKitchens: boolean;
    electronics: boolean;
  };
  maxPrices: {
    dishwashers: number;
    washingMachines: number;
  };
  keywords: string[];
}

export interface ScraperConfig {
  baseUrl: string;
  userAgent: string;
  requestDelayMs: number;
  maxRequestsPerMinute: number;
}
