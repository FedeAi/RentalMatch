export type OnboardingStep = 'welcome' | 'location' | 'budget' | 'preferences' | 'notifications' | 'paywall';

export interface OnboardingState {
  currentStep: OnboardingStep;
  data: {
    locations: string[];
    budget: {
      min: number;
      max: number;
    };
    preferences: {
      propertyTypes: string[];
      bedrooms: number;
      features: string[];
    };
    notifications: {
      email: boolean;
      whatsapp: boolean;
      frequency: 'instant' | 'daily' | 'weekly';
    };
  };
}

export interface PricingTier {
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  highlighted?: boolean;
}