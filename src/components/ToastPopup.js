import { useEffect } from 'react';
import styles from './ToastPopup.module.css';

function ToastPopup({ setToast, text }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className={styles.board}>
      <p className={styles.Toast}>{text}</p>
    </div>
  );
}

export default ToastPopup;
