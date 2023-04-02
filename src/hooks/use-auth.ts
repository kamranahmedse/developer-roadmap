import { useEffect, useState } from 'preact/hooks';
import { TokenPayload, decodeToken } from '../lib/utils';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../lib/constants';

export const useAuth = () => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    const payload = token ? decodeToken(token) : null;
    setUser(payload);
    setIsLoading(false);
  }, []);

  return { user, isLoading };
};
