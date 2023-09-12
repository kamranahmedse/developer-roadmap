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

  function warning(message: string) {
    $toastMessage.set({ type: 'warning', message });
  }

  function loading(message: string) {
    $toastMessage.set({ type: 'loading', message });
  }

  return { success, error, info, warning, loading, $toastMessage };
}
