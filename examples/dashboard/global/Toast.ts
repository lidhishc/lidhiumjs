import "vue3-toastify/dist/index.css";

import { ToastOptions, toast } from "vue3-toastify";

export function useToast() {
  const notify = (msg: string, opts: ToastOptions) =>
    toast(msg, {
      position: toast.POSITION.TOP_RIGHT,
      ...opts,
    });

  const success = (msg: string, opts: ToastOptions = {}) =>
    notify(msg, { ...opts, type: "success" });

  const error = (msg: string, opts: ToastOptions = {}) =>
    notify(msg, { ...opts, type: "error" });

  return { notify, success, error };
}

export default useToast;
