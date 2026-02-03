import { NextRequest, NextResponse } from 'next/server';
import { createScraper } from '@/lib/scraper';
import type { SearchParams } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const params: SearchParams = await request.json();
    
    // Validate required fields
    if (!params.city || !params.radius) {
      return NextResponse.json(
        { error: 'City and radius are required' },
        { status: 400 }
      );
    }

    const scraper = createScraper();
    
    // Use mock for development - change to search() for production scraping
    const listings = await scraper.searchMock(params);
    
    return NextResponse.json({ listings });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search listings' },
      { status: 500 }
    );
  }
}
