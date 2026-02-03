'use client';

import { useState } from 'react';
import type { Listing, SearchParams } from '@/types';
import FilterPanel from './FilterPanel';
import ListingGrid from './ListingGrid';

export default function SearchInterface() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to search listings');
      }

      const data = await response.json();
      setListings(data.listings || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Kleinanzeigen Finder
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Find your perfect items on Kleinanzeigen with advanced filters
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Panel - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <FilterPanel onSearch={handleSearch} loading={loading} />
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Searching for listings...</p>
                </div>
              </div>
            )}

            {!loading && listings.length === 0 && (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No listings found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}

            {!loading && listings.length > 0 && (
              <div>
                <div className="mb-4 text-sm text-gray-600">
                  Found {listings.length} listing{listings.length !== 1 ? 's' : ''}
                </div>
                <ListingGrid listings={listings} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
