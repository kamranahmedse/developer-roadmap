import { atom } from 'nanostores';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';
export type ToastMessage = {
  type: ToastType;
  message: string;
};

export const $toastMessage = atom<ToastMessage | undefined>(undefined);
