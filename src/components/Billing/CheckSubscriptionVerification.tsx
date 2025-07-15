import { useEffect, useState } from 'react';
import { getUrlParams } from '../../lib/browser';
import { VerifyUpgrade } from "./VerifyUpgrade";

export function CheckSubscriptionVerification() {
  const [shouldVerifyUpgrade, setShouldVerifyUpgrade] = useState(false);

  useEffect(() => {
    const params = getUrlParams();
    if (params.s !== '1') {
      return;
    }

    setShouldVerifyUpgrade(true);
  }, []);

  if (!shouldVerifyUpgrade) {
    return null;
  }

  return <VerifyUpgrade />;
}
