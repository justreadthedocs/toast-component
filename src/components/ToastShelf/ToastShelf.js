import React from 'react';

import styles from './ToastShelf.module.css';

function ToastShelf({ children }) {
  return (
    <ol className={styles.wrapper}>
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
