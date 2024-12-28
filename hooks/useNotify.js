import { toast } from 'react-toastify';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

const useNotify = () => {
  const notification = (status, message) => {
    const notifyMap = {
      success: toast.success,
      warning: toast.warning,
      info: toast.info,
      error: toast.error,
    };

    const notify = notifyMap[status] || toast.success;
    notify(message, { ...toastConfig });
  };
  return [notification];
};

export default useNotify;
