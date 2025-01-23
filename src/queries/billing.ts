import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';
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