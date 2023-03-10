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

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, [setToasts]);

  React.useEffect(() => {
    const removeAllToastsOnEsc = (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      removeAllToasts();
    };

    window.addEventListener('keydown', removeAllToastsOnEsc);

    return () => {
      window.removeEventListener('keydown', removeAllToastsOnEsc);
    };
  });

  const toastsContextValue = React.useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
      removeAllToasts,
    }),
    [toasts, addToast, removeToast, removeAllToasts]
  );

  return <ToastsContext.Provider value={toastsContextValue}>{children}</ToastsContext.Provider>;
}

export default ToastProvider;
