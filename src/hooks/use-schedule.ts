import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../stores/query-client';
import { httpGet, httpPost } from '../lib/query-http';
import { isLoggedIn } from '../lib/jwt';

export interface CalendarDocument {
  _id: string;

  userId: string;
  externalId: string;
  credentials: {};

  createdAt: Date;
  updatedAt: Date;
}

type ListConnectedCalendarsResponse = Omit<CalendarDocument, 'credentials'>[];

export function useListConnectedCalenders() {
  return useQuery<ListConnectedCalendarsResponse>(
    {
      queryKey: ['connected-calendars'],
      queryFn: async () => {
        return httpGet('/v1-list-connected-calendars');
      },
      enabled: !!isLoggedIn(),
      staleTime: 1000 * 60 * 5,
    },
    queryClient,
  );
}
