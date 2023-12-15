import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Nav.module.css';
import Category from './Category';
import Container from './Container';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
  const Token = localStorage.getItem('login');

  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword');

  const nowUrl = decodeURI(window.location.pathname);
  let nowKeyword = '';
  if (nowUrl.indexOf('keyword')) {
    nowKeyword = nowUrl.replace('/search/keyword=', '');
  }

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initKeyword || '');

  useEffect(() => {
    const newKeyword = searchParams.get('keyword');
    setKeyword(newKeyword || '');

    if (nowKeyword !== keyword) {
      setKeyword('');
    } else {
      setKeyword(keyword);
    }
  }, [searchParams, nowKeyword]);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.removeItem('login');
    alert('로그아웃 완료');
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword) {
      return false;
    } else {
      setSearchParams(
        keyword ? { keyword, search: 'search' } : { search: 'search' }
      );
      let newKeyword = `keyword=${keyword}`;
      navigate(`search/${newKeyword}`);
    }
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <Link to="/">
          <h2 className={styles.logo}>중고 나라</h2>
        </Link>
        <div className={styles.searchForm}>
          <form className={styles.form} onSubmit={handleSearch}>
            <button type="submit" className={styles.searchBtn}>
              <FontAwesomeIcon icon={faSearch} />
            </button>

            <input
              name="keyword"
              value={keyword}
              onChange={handleKeywordChange}
              className={styles.searchInput}
              autoComplete="off"
              placeholder="어떤 상품을 찾으시나요?"
            />
          </form>
          <div className={styles.recentSearch}>
            <div className={styles.recentTitle}>
              <h1>최근 검색어</h1>
              <button>
                <p className={styles.recentDelete}>전체 삭제</p>
              </button>
            </div>
            <div className={styles.recentList}>
              <ul className={styles.recentList}>
                <li>
                  <button className={styles.recentWord}>
                    맥북 프로{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
                <li>
                  <button className={styles.recentWord}>
                    ASUS 노트북{' '}
                    <FontAwesomeIcon icon={faXmark} className={styles.xmark} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

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
