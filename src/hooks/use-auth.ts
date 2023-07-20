import Cookies from 'js-cookie';
import { decodeToken, TOKEN_COOKIE_NAME } from '../lib/jwt';

export function useAuth() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);
  if (!token) {
    return null;
  }

  return decodeToken(token);
}
