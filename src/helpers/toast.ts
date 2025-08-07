import { toast } from 'sonner';

interface ToastParams {
  message?: string;
  description?: string;
  duration?: number;
  options?: any;
}

export const Toast = {
  showSuccess: (params: ToastParams) => {
    if (params?.message) {
      toast.success(params?.message || '', {
        style: { backgroundColor: '#EAFBE7' },
        description: params?.description,
        duration: 2000,
        dismissible: true,
        icon: null,
      });
    }
  },
  showError: (params: ToastParams) => {
    if (params?.message) {
      toast.error(params?.message || '', {
        style: { backgroundColor: '#FDE8E8' },
        ...params?.options,
        duration: 3500,
        dismissible: true,
        icon: null,
      });
    }
  },
  showNotification: (params: ToastParams) => {
    if (params?.message) {
      toast.info(params?.message || '', {
        description: params?.description,
        duration: 5000,
        dismissible: true,
      });
    }
  },
};
