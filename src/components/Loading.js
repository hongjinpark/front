import styles from './Loading.module.css';
import Spinner from '../assets/images/product/Loading.gif';

export default function Loading() {
  return (
    <div className={styles.background}>
      <div className={styles.loadingText}>잠시만 기다려주세요.</div>
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
}
