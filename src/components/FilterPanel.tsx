'use client';

import { useState } from 'react';
import type { SearchParams } from '@/types';

interface FilterPanelProps {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

export default function FilterPanel({ onSearch, loading }: FilterPanelProps) {
  const [city, setCity] = useState('berlin');
  const [radius, setRadius] = useState(10);
  const [keywords, setKeywords] = useState('');
  const [categories, setCategories] = useState({
    freeItems: false,
    dishwashers: false,
    washingMachines: false,
    chesterfieldSofas: false,
    chairs: false,
    freeKitchens: false,
    electronics: false,
  });
  const [maxPrices, setMaxPrices] = useState({
    dishwashers: 50,
    washingMachines: 50,
  });

  const germanCities = [
    { value: 'berlin', label: 'Berlin' },
    { value: 'hamburg', label: 'Hamburg' },
    { value: 'munich', label: 'München' },
    { value: 'cologne', label: 'Köln' },
    { value: 'frankfurt', label: 'Frankfurt' },
    { value: 'stuttgart', label: 'Stuttgart' },
    { value: 'dusseldorf', label: 'Düsseldorf' },
    { value: 'dortmund', label: 'Dortmund' },
    { value: 'essen', label: 'Essen' },
    { value: 'leipzig', label: 'Leipzig' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params: SearchParams = {
      city,
      radius,
      categories,
      maxPrices,
      keywords: keywords.split(',').map(k => k.trim()).filter(k => k.length > 0),
    };

    onSearch(params);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Search Filters</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <div>
          <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
            City
          </label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          >
            {germanCities.map(city => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        {/* Radius */}
        <div>
          <label htmlFor="radius" className="block text-sm font-semibold text-gray-700 mb-2">
            Radius: {radius} km
          </label>
          <input
            type="range"
            id="radius"
            min="5"
            max="100"
            step="5"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 km</span>
            <span>100 km</span>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="space-y-3">
            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.freeItems}
                onChange={(e) => setCategories({ ...categories, freeItems: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                Free Items (0€)
              </span>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.dishwashers}
                onChange={(e) => setCategories({ ...categories, dishwashers: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="ml-3 flex-1">
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Dishwashers
                </span>
                {categories.dishwashers && (
                  <input
                    type="number"
                    value={maxPrices.dishwashers}
                    onChange={(e) => setMaxPrices({ ...maxPrices, dishwashers: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Max price (€)"
                    min="0"
                  />
                )}
              </div>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.washingMachines}
                onChange={(e) => setCategories({ ...categories, washingMachines: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="ml-3 flex-1">
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  Washing Machines
                </span>
                {categories.washingMachines && (
                  <input
                    type="number"
                    value={maxPrices.washingMachines}
                    onChange={(e) => setMaxPrices({ ...maxPrices, washingMachines: parseInt(e.target.value) || 0 })}
                    className="mt-1 w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Max price (€)"
                    min="0"
                  />
                )}
              </div>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.chesterfieldSofas}
                onChange={(e) => setCategories({ ...categories, chesterfieldSofas: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                Chesterfield Sofas
              </span>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.chairs}
                onChange={(e) => setCategories({ ...categories, chairs: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                Chairs
              </span>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.freeKitchens}
                onChange={(e) => setCategories({ ...categories, freeKitchens: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                Free Kitchens
              </span>
            </label>

            <label className="flex items-start cursor-pointer group">
              <input
                type="checkbox"
                checked={categories.electronics}
                onChange={(e) => setCategories({ ...categories, electronics: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                Electronics (works flawlessly)
              </span>
            </label>
          </div>
        </div>

        {/* Keywords */}
        <div>
          <label htmlFor="keywords" className="block text-sm font-semibold text-gray-700 mb-2">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., braun, leder, modern"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-400"
          />
          <p className="mt-1 text-xs text-gray-500">
            Filter results by specific keywords in title or description
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </span>
          ) : (
            'Search Listings'
          )}
        </button>
      </form>
    </div>
  );
}
