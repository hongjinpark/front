import { useEffect } from 'react';
import styles from './ToastPopup.module.css';

function ToastPopup({ toastMessage, setToastMessage }) {
  useEffect(() => {
    if (toastMessage == null) {
      undefined;
    } else if (toastMessage.length > 0) {
      setTimeout(() => {
        setToastMessage([]);
      }, 2000);
    }
  }, [toastMessage, setToastMessage]);

  if (toastMessage < 1 || toastMessage == null) {
    return null;
  }

  return (
    <div className={styles.board}>
      <p className={styles.Toast}>{toastMessage}</p>
    </div>
  );
}

export default ToastPopup;
