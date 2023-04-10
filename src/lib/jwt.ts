import * as jose from 'jose';

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
};

export function decodeToken(token: string): TokenPayload {
  const claims = jose.decodeJwt(token);

  return claims as TokenPayload;
}
