import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();
  const Token = localStorage.getItem('login');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem('login');
    alert('로그아웃 완료');
    navigate('/');
  };
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.links}>
          <li className={styles.items}>중고 거래 사이트</li>
          <li>개인정보 취급방침</li>
          <li>사용자 이용약관</li>
          <li>자주 묻는 질문</li>
        </ul>
        <ul className={styles.info}>
          <li>(주)중고 거래 사이트</li>
          <li>대표 | 대표자 </li>
          <li>개인정보보호책임자 | 대표자 </li>
          <li>대표 번호 | 대표 번호 </li>
          <li>사업자번호 | ***-**-****</li>
          <li>통신판매업 | 제****-서울**-****호 </li>
          <li>주소 | 주소 </li>
        </ul>
        <div className={styles.icons}>
          <div>
            {!Token && (
              <button className={styles.login}>
                <Link to="/Login">로그인</Link>
              </button>
            )}

            {Token && (
              <button onClick={handleLogin} className={styles.logout}>
                로그아웃
              </button>
            )}
          </div>
          <div className={styles.sns}>
            <div>페이스북</div>
            <div>트위터</div>
            <div>인스타</div>
          </div>
        </div>
      </div>
    </div>
  );
}
