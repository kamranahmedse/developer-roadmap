import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
import {
  BookCopyIcon,
  BotIcon,
  CodeIcon,
  FenceIcon,
  ShieldCheckIcon,
  SparkleIcon,
  SparklesIcon,
  SwordsIcon,
} from 'lucide-react';
import type { AllowedSubscriptionStatus } from '../api/user';

type BillingDetailsResponse = {
  status: AllowedSubscriptionStatus;
  planId?: string;
  priceId?: string;
  interval?: string;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
};

export function billingDetailsOptions() {
  return queryOptions({
    queryKey: ['billing-details'],
    queryFn: async () => {
      return httpGet<BillingDetailsResponse>('/v1-billing-details');
    },
    enabled: !!isLoggedIn(),
  });
}

export const USER_SUBSCRIPTION_PLANS = [
  {
    name: 'Free',
    planId: 'free',
    prices: {
      month: {
        id: 'free',
        amount: 0,
        interval: 'month',
      },
      year: {
        id: 'free',
        amount: 0,
        interval: 'year',
      },
    },
    features: [
      {
        label: 'Access to all free courses',
        icon: SparkleIcon,
      },
      {
        label: 'Access to free course materials',
        icon: FenceIcon,
      },
    ],
  },
  {
    name: 'Pro',
    planId: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_PLAN_ID,
    prices: {
      month: {
        id: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_MONTHLY_PRICE_ID,
        amount: 599,
        interval: 'month',
      },
      year: {
        id: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_YEARLY_PRICE_ID,
        amount: 5999,
        interval: 'year',
      },
    },
    features: [
      {
        label: 'All Free features',
        icon: SparklesIcon,
      },
      {
        label: 'Full access to all the courses',
        icon: BookCopyIcon,
      },
      {
        label: 'Personalized access using AI',
        icon: BotIcon,
      },
      {
        label: 'Certificate of Completion',
        icon: ShieldCheckIcon,
      },
      {
        label: 'Playground for live-coding',
        icon: CodeIcon,
      },
      {
        label: 'Challenges / Quizes',
        icon: SwordsIcon,
      },
    ],
  },
] as const;
