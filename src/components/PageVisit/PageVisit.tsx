import { useEffect } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { httpPost } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';

type PageVisitProps = {
  resourceId?: string;
  resourceType?: ResourceType;
};

export function PageVisit(props: PageVisitProps) {
  const { resourceId, resourceType } = props;

  useEffect(() => {
    if (!isLoggedIn()) {
      return;
    }

    httpPost(`${import.meta.env.PUBLIC_API_URL}/v1-visit`, {
      ...(resourceType && { resourceType, resourceId }),
    }).finally(() => {});
  }, []);

  return null;
}
