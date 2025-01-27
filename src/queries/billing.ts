import { queryOptions } from '@tanstack/react-query';
import { httpGet } from '../lib/query-http';

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