import { SearchCriteria } from '../../types/property';

interface SearchFiltersProps {
  criteria: SearchCriteria;
  onChange: (criteria: SearchCriteria) => void;
  onSaveProfile: () => void;
}

const propertyTypes = [
  'Apartment',
  'House',
  'Studio',
  'Townhouse',
  'Condo',
];

export default function SearchFilters({ criteria, onChange, onSaveProfile }: SearchFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Range */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              value={criteria.minPrice || ''}
              onChange={(e) => onChange({ ...criteria, minPrice: Number(e.target.value) || undefined })}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              value={criteria.maxPrice || ''}
              onChange={(e) => onChange({ ...criteria, maxPrice: Number(e.target.value) || undefined })}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <select
            className="w-full px-3 py-2 rounded-md border border-gray-300"
            value={criteria.bedrooms || ''}
            onChange={(e) => onChange({ ...criteria, bedrooms: Number(e.target.value) || undefined })}
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num}+ beds</option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={criteria.propertyType?.includes(type) || false}
                  onChange={(e) => {
                    const types = criteria.propertyType || [];
                    onChange({
                      ...criteria,
                      propertyType: e.target.checked
                        ? [...types, type]
                        : types.filter((t) => t !== type),
                    });
                  }}
                  className="rounded border-gray-300 text-indigo-600"
                />
                <span className="text-sm text-gray-600">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Save Profile Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onSaveProfile}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Save as Search Profile
        </button>
      </div>
    </div>
  );
}