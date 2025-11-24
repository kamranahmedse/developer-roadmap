import { useEffect } from 'react';
import { isLoggedIn } from '../../lib/jwt';
import { httpPost } from '../../lib/http';
import type { ResourceType } from '../../lib/resource-progress';
import { storePathAsLastPath } from '../../lib/browser';

type PageVisitProps = {
  resourceId?: string;
  resourceType?: ResourceType;
};

export function PageVisit(props: PageVisitProps) {
  const { resourceId, resourceType } = props;

  useEffect(() => {
    storePathAsLastPath();

    if (!isLoggedIn()) {
      return;
    }

    httpPost(`${import.meta.env.PUBLIC_API_URL}/v1-visit`, {
      ...(resourceType && { resourceType, resourceId }),
    }).finally(() => {});
  }, []);

  return null;
}
