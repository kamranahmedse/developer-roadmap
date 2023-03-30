import * as jose from 'jose';

export const TOKEN_COOKIE_NAME = '__timefyi_jt__';
export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};

export function decodeToken(token: string): TokenPayload {
  const claims = jose.decodeJwt(token);

  return claims as TokenPayload;
}
