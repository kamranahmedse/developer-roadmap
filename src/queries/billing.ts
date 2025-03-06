import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

export const allowedSubscriptionStatus = [
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'paused',
  'trialing',
  'unpaid',
  'none',
] as const;
export type AllowedSubscriptionStatus =
  (typeof allowedSubscriptionStatus)[number];

export const USER_SUBSCRIPTION_PLAN_PRICES = [
  {
    name: 'Pay Monthly',
    interval: 'month',
    priceId: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_MONTHLY_PRICE_ID,
    amount: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_MONTHLY_PRICE_AMOUNT,
  },
  {
    name: 'Pay Yearly',
    interval: 'year',
    priceId: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_YEARLY_PRICE_ID,
    amount: import.meta.env.PUBLIC_STRIPE_INDIVIDUAL_YEARLY_PRICE_AMOUNT,
  },
] as const;

export type AllowedSubscriptionInterval =
  (typeof USER_SUBSCRIPTION_PLAN_PRICES)[number]['interval'];

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

type CoursePriceParams = {
  courseSlug: string;
};

type CoursePriceResponse = {
  flag: string;
  fullPrice: number;
  regionalPrice: number;
  regionalDiscountPercentage: number;
  isEligibleForDiscount: boolean;
};

export function coursePriceOptions(params: CoursePriceParams) {
  return queryOptions({
    queryKey: ['course-price', params],
    queryFn: async () => {
      return httpGet<CoursePriceResponse>(
        `/v1-course-price/${params.courseSlug}`,
      );
    },
  });
}
