import React from 'react';

import styles from './ToastShelf.module.css';

function ToastShelf({ children }) {
  return (
    <ol
      role='region'
      aria-live='polite'
      aria-label='Notification'
      className={styles.wrapper}
    >
      {children.map((child) => (
        <li
          key={child.key}
          className={styles.toastWrapper}
        >
          {child}
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
