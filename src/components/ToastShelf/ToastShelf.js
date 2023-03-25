import React from 'react';

import Toast from '../Toast/Toast';
import { ToastsContext } from '../ToastProvider';

import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts } = React.useContext(ToastsContext);

  return (
    <ol
      role='region'
      aria-live='polite'
      aria-label='Notification'
      className={styles.wrapper}
    >
      {toasts.map(({ id, message, variant }) => (
        <li
          key={id}
          className={styles.toastWrapper}
        >
          <Toast
            toastId={id}
            variant={variant}
          >
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
