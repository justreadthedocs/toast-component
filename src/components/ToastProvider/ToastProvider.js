import React from 'react';

import useKeyboard from '../../hooks/useKeyboard';

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

  const ifEscapeKey = React.useCallback((event) => event.key === 'Escape', []);
  useKeyboard(ifEscapeKey, removeAllToasts);

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
