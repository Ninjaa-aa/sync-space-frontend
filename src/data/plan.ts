// src/data/plans.ts

export interface PlanFeature {
  title: string;
  description: string;
  included: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
  maxMembers?: number;
  storageLimit?: string;
}

export const pricingPlans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingPeriod: 'monthly',
    description: 'For small teams getting started',
    features: [
      {
        title: 'Up to 10 members',
        description: 'Perfect for small teams',
        included: true,
      },
      {
        title: '5GB storage',
        description: 'Store your most important files',
        included: true,
      },
      {
        title: 'Basic message history',
        description: 'Access to last 10,000 messages',
        included: true,
      },
      {
        title: 'Standard support',
        description: 'Email support with 24-48h response time',
        included: true,
      },
      {
        title: 'Advanced permissions',
        description: 'Granular access control',
        included: false,
      }
    ],
    maxMembers: 10,
    storageLimit: '5GB'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 12,
    billingPeriod: 'monthly',
    description: 'For growing businesses',
    features: [
      {
        title: 'Unlimited members',
        description: 'Scale your team without limits',
        included: true,
      },
      {
        title: '50GB storage',
        description: 'Ample space for all your files',
        included: true,
      },
      {
        title: 'Unlimited message history',
        description: 'Access all your message history',
        included: true,
      },
      {
        title: 'Priority support',
        description: '24/7 support with 4h response time',
        included: true,
      },
      {
        title: 'Advanced permissions',
        description: 'Granular access control',
        included: true,
      }
    ],
    highlighted: true,
    storageLimit: '50GB'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 35,
    billingPeriod: 'monthly',
    description: 'For large organizations with advanced needs',
    features: [
      {
        title: 'Everything in Pro',
        description: 'All Pro features included',
        included: true,
      },
      {
        title: 'Unlimited storage',
        description: 'No storage limits',
        included: true,
      },
      {
        title: 'Custom integrations',
        description: 'Build your own integrations',
        included: true,
      },
      {
        title: 'Dedicated support',
        description: 'Dedicated account manager',
        included: true,
      },
      {
        title: 'Advanced security',
        description: 'Enterprise-grade security features',
        included: true,
      }
    ],
    storageLimit: 'Unlimited'
  }
];