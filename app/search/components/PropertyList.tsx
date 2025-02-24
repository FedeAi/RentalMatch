import { Property } from '../../types/property';
import Image from 'next/image';

interface PropertyListProps {
  properties: Property[];
}

export default function PropertyList({ properties }: PropertyListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No properties found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48">
            {property.images[0] && (
              <Image
                src={property.images[0]}
                alt={property.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            <p className="text-gray-500">{property.location}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">${property.price.toLocaleString()}</span>
              <div className="flex items-center space-x-2 text-gray-500">
                <span>{property.bedrooms} beds</span>
                <span>•</span>
                <span>{property.bathrooms} baths</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">From {property.source}</span>
              <a
                href={property.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}