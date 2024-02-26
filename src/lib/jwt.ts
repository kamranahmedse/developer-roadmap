import * as jose from 'jose';
import Cookies from 'js-cookie';

export const TOKEN_COOKIE_NAME = '__roadmapsh_jt__';

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
  avatar: string;
};

export function decodeToken(token: string): TokenPayload {
  const claims = jose.decodeJwt(token);

  return claims as TokenPayload;
}

export function isLoggedIn() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);

  return !!token;
}

export function getUser() {
  const token = Cookies.get(TOKEN_COOKIE_NAME);

  if (!token) {
    return null;
  }

  return decodeToken(token);
}

export function setAuthToken(token: string) {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    path: '/',
    expires: 30,
    sameSite: 'lax',
    secure: true,
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function removeAuthToken() {
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: '/',
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}
