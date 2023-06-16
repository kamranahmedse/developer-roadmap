import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME, decodeToken } from '../lib/jwt';

export function useAuth() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }
  const user = decodeToken(token);

  return user;
}
