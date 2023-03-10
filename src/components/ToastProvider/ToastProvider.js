import React from 'react';

export const ToastsContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback((newToast) => {
    setToasts((oldToasts) => [...oldToasts, newToast]);
  }, []);

  const removeToast = React.useCallback((id) => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.id !== id));
  }, []);

  const toastsContextValue = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast]
  );

  return <ToastsContext.Provider value={toastsContextValue}>{children}</ToastsContext.Provider>;
}

export default ToastProvider;
