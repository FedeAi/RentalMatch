export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  propertyType: string;
  images: string[];
  createdAt: string;
  source: string;
  sourceUrl: string;
}

export interface SearchCriteria {
  location: string[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string[];
  minArea?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  searchProfiles: SearchCriteria[];
  notificationPreferences: {
    email: boolean;
    whatsapp: boolean;
    frequency: 'instant' | 'daily' | 'weekly';
  };
}