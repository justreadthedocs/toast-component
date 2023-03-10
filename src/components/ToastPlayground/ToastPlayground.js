import React from 'react';

import Button from '../Button';
import Toast from '../Toast';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState('notice');
  const [toasts, setToasts] = React.useState([]);

  const messageInputRef = React.useRef(null);

  React.useEffect(() => {
    messageInputRef?.current.focus();
  }, []);

  const handleToastDismiss = (key) => () => {
    setToasts((oldToasts) => oldToasts.filter((toast) => toast.key !== key));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newToastKey = crypto.randomUUID();
    const newToast = {
      key: newToastKey,
      variant: variant,
      children: message,
      onDismiss: handleToastDismiss(newToastKey),
    };

    setToasts([...toasts, newToast]);
    setMessage('');
    setVariant('notice');
    messageInputRef?.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img
          alt='Cute toast mascot'
          src='/toast.png'
        />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf>
        {toasts.map((toast) => (
          <Toast {...toast} />
        ))}
      </ToastShelf>

      <form
        onSubmit={handleFormSubmit}
        className={styles.controlsWrapper}
      >
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              ref={messageInputRef}
              className={styles.messageInput}
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variantOption) => (
              <label
                key={variantOption}
                htmlFor={`variant-${variantOption}`}
              >
                <input
                  id={`variant-${variantOption}`}
                  type='radio'
                  name='variant'
                  value={variantOption}
                  checked={variant === variantOption}
                  onChange={(event) => {
                    setVariant(event.target.value);
                  }}
                />
                {variantOption}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
