import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Nav.module.css';
import Category from './Category';
import Container from './Container';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import secureLocalStorage from 'react-secure-storage';

export default function Nav() {
  const Token = localStorage.getItem('login');
  const [isDropMenu, setIsDropMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword');
  const nowUrl = decodeURI(window.location.pathname);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initKeyword || '');
  const [show, setOff] = useState(false);
  let nowKeyword = '';

  if (nowUrl.indexOf('keyword')) {
    nowKeyword = nowUrl.replace('/search/keyword=', '');
  }

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
    secureLocalStorage.removeItem('role');
    localStorage.removeItem('user');
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

  const handleSearchBar = (e) => {
    let newClassName = e.target.className;

    if (newClassName instanceof SVGAnimatedString) {
      setIsDropMenu(false);
    } else if (newClassName.includes('SearchBar_searchBar__1Vvic')) {
      setIsDropMenu(true);
    } else if (isDropMenu === true) {
      setIsDropMenu(false);
    }

    if (show === true) {
      setOff(false);
    }
  };

  const toggleDropMenu = () => {
    setIsDropMenu((prevState) => !prevState);
  };

  const handlemyPageClick = () => {
    console.log('선택');
    setOff((prevState) => !prevState);
  };

  return (
    <div className={styles.nav} onClick={handleSearchBar} role="presentation">
      <div className={styles.container}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            <Link
              to="/product"
              className={styles.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <FontAwesomeIcon icon={faFilePen} className={styles.menuSell} />
              판매하기
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/lounge"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Lounge
            </Link>
          </li>

          <li>
            <Link
              to="/notice"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Notice
            </Link>
          </li>
          {Token ? (
            <li
              className={styles.navMyPage}
              onClick={handlemyPageClick}
              role="presentation"
            >
              <FontAwesomeIcon icon={faUser} className={styles.mypage} />
              {show && (
                <div className={styles.myPageBox}>
                  <ul>
                    <li>
                      <Link
                        to="/mypage"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        마이페이지
                      </Link>
                    </li>
                    {Token && (
                      <li>
                        <button onClick={handleLogin} className={styles.logout}>
                          로그아웃
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          )}
        </ul>
      </div>
      <Container>
        <Category />
      </Container>
    </div>
  );
}
