import { atom } from 'nanostores';

export const pageProgressMessage = atom<string | undefined>(undefined);
export const sponsorHidden = atom(false);

export const roadmapsDropdownOpen = atom(false);
export const navigationDropdownOpen = atom(false);

export const isOnboardingStripHidden = atom(false);

export const aiDropdownOpen = atom(false);