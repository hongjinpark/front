import { Link, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import Category from './Category';
import Container from './Container';

export default function Nav() {
  const navigate = useNavigate();
  const Token = localStorage.getItem('login');

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem('login');
    alert('로그아웃 완료');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <Link to="/">
          <h2 className={styles.logo}>중고 나라</h2>
        </Link>
        <form className={styles.form} onSubmit={handleSearch}>
          <input
            name="keyword"
            value="search"
            placeholder="검색으로 과정 찾기"
          />
          <button type="submit">검색</button>
        </form>
        <ul className={styles.menu}>
          <li>
            <Link to="/editor" className={styles.link}>
              Editor
            </Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/lounge">Lounge</Link>
          </li>
          <li>
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
          </li>
          <li>
            <Link to="/notice">Notice</Link>
          </li>
          <li>
            <Link to="/mypage">MyPage</Link>
          </li>
        </ul>
      </div>
      <Container>
        <Category />
      </Container>
    </div>
  );
}
