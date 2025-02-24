'use client';

import { useState } from 'react';
import { OnboardingState, OnboardingStep, PricingTier } from '../types/onboarding';
import { useRouter } from 'next/navigation';

const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 0,
    interval: 'month',
    features: [
      'Basic property search',
      'Daily email updates',
      'Single search profile',
    ],
  },
  {
    name: 'Pro',
    price: 29,
    interval: 'month',
    features: [
      'Instant notifications',
      'Multiple search profiles',
      'WhatsApp alerts',
      'Advanced filters',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: [
      'All Pro features',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [state, setState] = useState<OnboardingState>({
    currentStep: 'welcome',
    data: {
      locations: [],
      budget: {
        min: 0,
        max: 0,
      },
      preferences: {
        propertyTypes: [],
        bedrooms: 0,
        features: [],
      },
      notifications: {
        email: true,
        whatsapp: false,
        frequency: 'daily',
      },
    },
  });

  const nextStep = () => {
    const steps: OnboardingStep[] = ['welcome', 'location', 'budget', 'preferences', 'notifications', 'paywall'];
    const currentIndex = steps.indexOf(state.currentStep);
    if (currentIndex < steps.length - 1) {
      setState(prev => ({ ...prev, currentStep: steps[currentIndex + 1] }));
    }
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 'welcome':
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to RentalMatch</h2>
            <p className="mt-4 text-lg text-gray-600">
              Let's set up your perfect property search in just a few steps.
            </p>
            <button
              onClick={nextStep}
              className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500"
            >
              Get Started
            </button>
          </div>
        );

      case 'location':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Where would you like to live?</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter a location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onChange={(e) => {
                  setState(prev => ({
                    ...prev,
                    data: {
                      ...prev.data,
                      locations: [e.target.value],
                    },
                  }));
                }}
              />
              <button
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What's your budget?</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum</label>
                  <input
                    type="number"
                    placeholder="Min budget"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                      setState(prev => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          budget: {
                            ...prev.data.budget,
                            min: Number(e.target.value),
                          },
                        },
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maximum</label>
                  <input
                    type="number"
                    placeholder="Max budget"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md"
                    onChange={(e) => {
                      setState(prev => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          budget: {
                            ...prev.data.budget,
                            max: Number(e.target.value),
                          },
                        },
                      }));
                    }}
                  />
                </div>
              </div>
              <button
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Preferences</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Types</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Apartment', 'House', 'Studio', 'Townhouse', 'Condo'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const types = state.data.preferences.propertyTypes;
                          setState(prev => ({
                            ...prev,
                            data: {
                              ...prev.data,
                              preferences: {
                                ...prev.data.preferences,
                                propertyTypes: e.target.checked
                                  ? [...types, type]
                                  : types.filter(t => t !== type),
                              },
                            },
                          }));
                        }}
                        className="rounded border-gray-300 text-indigo-600"
                      />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  onChange={(e) => {
                    setState(prev => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        preferences: {
                          ...prev.data.preferences,
                          bedrooms: Number(e.target.value),
                        },
                      },
                    }));
                  }}
                >
                  <option value="">Any</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}+ beds</option>
                  ))}
                </select>
              </div>
              <button
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How would you like to be notified?</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label className="text-gray-700">Email Notifications</label>
                <input
                  type="checkbox"
                  checked={state.data.notifications.email}
                  onChange={(e) => {
                    setState(prev => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        notifications: {
                          ...prev.data.notifications,
                          email: e.target.checked,
                        },
                      },
                    }));
                  }}
                  className="rounded border-gray-300 text-indigo-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-700">WhatsApp Notifications</label>
                <input
                  type="checkbox"
                  checked={state.data.notifications.whatsapp}
                  onChange={(e) => {
                    setState(prev => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        notifications: {
                          ...prev.data.notifications,
                          whatsapp: e.target.checked,
                        },
                      },
                    }));
                  }}
                  className="rounded border-gray-300 text-indigo-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={state.data.notifications.frequency}
                  onChange={(e) => {
                    setState(prev => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        notifications: {
                          ...prev.data.notifications,
                          frequency: e.target.value as 'instant' | 'daily' | 'weekly',
                        },
                      },
                    }));
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="instant">Instant</option>
                  <option value="daily">Daily Digest</option>
                  <option value="weekly">Weekly Summary</option>
                </select>
              </div>
              <button
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 'paywall':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
            <p className="text-gray-600 mb-8">Select the plan that best fits your needs</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-lg border ${
                    tier.highlighted
                      ? 'border-indigo-600 shadow-lg'
                      : 'border-gray-200'
                  } p-6 ${tier.highlighted ? 'bg-indigo-50' : 'bg-white'}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{tier.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-500">/{tier.interval}</span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-indigo-500"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className={`mt-8 w-full rounded-md px-4 py-2 text-sm font-semibold ${
                      tier.highlighted
                        ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                        : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    {tier.price === 0 ? 'Get Started' : 'Subscribe Now'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((['welcome', 'location', 'budget', 'preferences', 'notifications', 'paywall'].indexOf(state.currentStep) + 1) /
                      6) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}
        </div>
      </div>
    </div>
  );
}