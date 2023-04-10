import { useEffect, useState } from 'preact/hooks';
import {TokenPayload, decodeToken, TOKEN_COOKIE_NAME} from '../lib/jwt';
import Cookies from 'js-cookie';

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
