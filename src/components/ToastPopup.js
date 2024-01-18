import { useEffect } from 'react';
import styles from './ToastPopup.module.css';

function ToastPopup({ toast, setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [toast]);

  return toast == true ? (
    <div className={styles.board}>
      <p className={styles.Toast}>{text}</p>
    </div>
  ) : null;
}

export default ToastPopup;
