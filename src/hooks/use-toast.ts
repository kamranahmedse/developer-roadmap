import { $toastMessage } from '../stores/toast';

export function useToast() {
  function success(message: string) {
    $toastMessage.set({ type: 'success', message });
  }
  function error(message: string) {
    $toastMessage.set({ type: 'error', message });
  }
  function info(message: string) {
    $toastMessage.set({ type: 'info', message });
  }

  return { success, error, info, $toastMessage };
}
