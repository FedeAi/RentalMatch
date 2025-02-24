'use client';

import { useState } from 'react';
import { UserProfile, SearchCriteria } from '../types/property';

export default function PreferencesPage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '',
    email: '',
    searchProfiles: [],
    notificationPreferences: {
      email: true,
      whatsapp: false,
      frequency: 'daily'
    }
  });

  const [newSearchProfile, setNewSearchProfile] = useState<SearchCriteria>({
    location: [],
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    propertyType: [],
    minArea: undefined,
  });

  const handleSaveProfile = async () => {
    // TODO: Save to Supabase
    setProfile(prev => ({
      ...prev,
      searchProfiles: [...prev.searchProfiles, newSearchProfile]
    }));
  };

  const handleDeleteProfile = (index: number) => {
    setProfile(prev => ({
      ...prev,
      searchProfiles: prev.searchProfiles.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Preferences</h1>
        
        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Email Notifications</label>
              <input
                type="checkbox"
                checked={profile.notificationPreferences.email}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  notificationPreferences: {
                    ...prev.notificationPreferences,
                    email: e.target.checked
                  }
                }))}
                className="rounded border-gray-300 text-indigo-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">WhatsApp Notifications</label>
              <input
                type="checkbox"
                checked={profile.notificationPreferences.whatsapp}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  notificationPreferences: {
                    ...prev.notificationPreferences,
                    whatsapp: e.target.checked
                  }
                }))}
                className="rounded border-gray-300 text-indigo-600"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Notification Frequency</label>
              <select
                value={profile.notificationPreferences.frequency}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  notificationPreferences: {
                    ...prev.notificationPreferences,
                    frequency: e.target.value as 'instant' | 'daily' | 'weekly'
                  }
                }))}
                className="rounded-md border-gray-300 text-gray-700"
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Summary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Profiles */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Profiles</h2>
          
          {/* Existing Profiles */}
          {profile.searchProfiles.map((searchProfile, index) => (
            <div key={index} className="border-b border-gray-200 py-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {searchProfile.location.join(', ')}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {searchProfile.propertyType?.join(', ')} • {searchProfile.bedrooms} beds • 
                    ${searchProfile.minPrice}-${searchProfile.maxPrice}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteProfile(index)}
                  className="text-red-600 hover:text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* New Profile Form */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Search Profile</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => setNewSearchProfile(prev => ({
                    ...prev,
                    location: [e.target.value]
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Price</label>
                  <input
                    type="number"
                    placeholder="Min price"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setNewSearchProfile(prev => ({
                      ...prev,
                      minPrice: Number(e.target.value)
                    }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Price</label>
                  <input
                    type="number"
                    placeholder="Max price"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    onChange={(e) => setNewSearchProfile(prev => ({
                      ...prev,
                      maxPrice: Number(e.target.value)
                    }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  onChange={(e) => setNewSearchProfile(prev => ({
                    ...prev,
                    bedrooms: Number(e.target.value)
                  }))}
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}+ beds</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Property Types</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {['Apartment', 'House', 'Studio', 'Townhouse', 'Condo'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const types = newSearchProfile.propertyType || [];
                          setNewSearchProfile(prev => ({
                            ...prev,
                            propertyType: e.target.checked
                              ? [...types, type]
                              : types.filter(t => t !== type)
                          }));
                        }}
                        className="rounded border-gray-300 text-indigo-600"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleSaveProfile}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Search Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}