import { atom } from 'nanostores';

export const pageProgressMessage = atom<string | undefined>(undefined);
export const sponsorHidden = atom(false);
