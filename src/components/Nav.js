import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Nav.module.css';
import Category from './Category';
import Container from './Container';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';

export default function Nav() {
  const Token = localStorage.getItem('login');

  const [isDropMenu, setIsDropMenu] = useState(false);

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

  const handleKeywordChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword) {
      return false;
    } else {
      let searchKeyword = keyword;
      let existingKeywords = JSON.parse(localStorage.getItem('keyword')) || [];
      existingKeywords.push(searchKeyword);

      localStorage.setItem('keyword', JSON.stringify(existingKeywords));

      setSearchParams(
        keyword ? { keyword, search: 'search' } : { search: 'search' }
      );
      let newKeyword = `keyword=${keyword}`;
      navigate(`search/${newKeyword}`);
    }
  };

  const toggleDropMenu = (e) => {
    console.log('e : ', e);
    // setIsDropMenu(e);
    setIsDropMenu((prevState) => !prevState);
  };

  console.log('isDropMenu : ', isDropMenu);

  return (
    <div
      className={styles.nav}
      onClick={() => {
        if (isDropMenu === true) setIsDropMenu(false);
      }}
      role="presentation"
    >
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
              onClick={() => {
                toggleDropMenu(true);
                console.log(isDropMenu);
              }}
              className={styles.searchInput}
              autoComplete="off"
              placeholder="어떤 상품을 찾으시나요?"
            />
          </form>
          {isDropMenu && (
            <SearchBar
              className={styles.recentSearch}
              keyword={keyword}
              onClick={() => setIsDropMenu(true)}
            />
          )}
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
