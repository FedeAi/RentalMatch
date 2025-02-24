'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import PropertyList from './components/PropertyList';
import SearchFilters from './components/SearchFilters';
import { Property, SearchCriteria } from '../types/property';

export default function SearchPage() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    location: [],
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    propertyType: [],
    minArea: undefined,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);

  const handleSearch = async () => {
    // TODO: Implement actual search logic with Supabase
    console.log('Searching with criteria:', searchCriteria);
  };

  const handleSaveProfile = async () => {
    // TODO: Implement save profile logic with Supabase
    console.log('Saving search profile:', searchCriteria);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter location..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) => setSearchCriteria({ ...searchCriteria, location: [e.target.value] })}
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
            >
              Search
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <SearchFilters
              criteria={searchCriteria}
              onChange={setSearchCriteria}
              onSaveProfile={handleSaveProfile}
            />
          )}

          {/* Results */}
          <PropertyList properties={properties} />
        </div>
      </div>
    </div>
  );
}