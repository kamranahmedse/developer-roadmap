import { useEffect, useState } from 'preact/hooks';
import { TOKEN_COOKIE_NAME, TokenPayload, decodeToken } from '../lib/utils';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );

  useEffect(() => {
    const token = Cookies.get(TOKEN_COOKIE_NAME);
    const payload = token ? decodeToken(token) : null;
    setUser(payload);
    setStatus('success');
  }, []);

  return { user, status };
};
