import * as jose from 'jose';
import Cookies from 'js-cookie';
import type { AllowedOnboardingStatus } from '../api/user';

export const TOKEN_COOKIE_NAME = '__roadmapsh_jt__';
export const FIRST_LOGIN_PARAM = 'fl' as const;

export type TokenPayload = {
  id: string;
  email: string;
  name: string;
  avatar: string;
  onboardingStatus?: AllowedOnboardingStatus;
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
  removeAIReferralCode();
}

export function removeAuthToken() {
  Cookies.remove(TOKEN_COOKIE_NAME, {
    path: '/',
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function visitAIRoadmap(roadmapId: string) {
  const isAlreadyVisited = Number(Cookies.get(`crv-${roadmapId}`) || 0) === 1;
  if (isAlreadyVisited) {
    return;
  }

  Cookies.set(`crv-${roadmapId}`, '1', {
    path: '/',
    expires: 1 / 24, // 1 hour
    sameSite: 'lax',
    secure: !import.meta.env.DEV,
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function deleteOpenAIKey() {
  Cookies.remove('oak', {
    path: '/',
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function saveOpenAIKey(apiKey: string) {
  Cookies.set('oak', apiKey, {
    path: '/',
    expires: 365,
    sameSite: 'lax',
    secure: true,
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function getOpenAIKey() {
  return Cookies.get('oak');
}

const AI_REFERRAL_COOKIE_NAME = 'referral_code';

export function setAIReferralCode(code: string) {
  const alreadyExist = Cookies.get(AI_REFERRAL_COOKIE_NAME);
  if (alreadyExist) {
    return;
  }

  Cookies.set(AI_REFERRAL_COOKIE_NAME, code, {
    path: '/',
    expires: 365,
    sameSite: 'lax',
    secure: true,
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function removeAIReferralCode() {
  Cookies.remove(AI_REFERRAL_COOKIE_NAME, {
    path: '/',
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}

export function setViewSponsorCookie(sponsorId: string) {
  const key = `vsc-${sponsorId}`;
  const alreadyExist = Cookies.get(key);
  if (alreadyExist) {
    return;
  }

  Cookies.set(key, '1', {
    path: '/',
    expires: 1,
    sameSite: 'lax',
    secure: true,
    domain: import.meta.env.DEV ? 'localhost' : '.roadmap.sh',
  });
}
