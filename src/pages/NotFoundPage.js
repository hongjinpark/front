import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>존재하지 않는 페이지입니다.</h2>
          <p>올바른 주소가 맞는지 다시 한 번 확인해주세요.</p>
          <div className={styles.link}>
            <Link to="/">
              <button>홈으로 가기</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
