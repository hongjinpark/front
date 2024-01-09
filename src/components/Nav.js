import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Nav.module.css';
import Category from './Category';
import Container from './Container';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import secureLocalStorage from 'react-secure-storage';
import ChatModalContext from '../context/ChatModalProvider';

export default function Nav() {
  const Token = localStorage.getItem('login');
  const [isDropMenu, setIsDropMenu] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initKeyword = searchParams.get('keyword');
  const nowUrl = decodeURI(window.location.pathname);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initKeyword || '');
  const [show, setOff] = useState(false);
  const { setIsOpen } = useContext(ChatModalContext);
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
      existingKeywords.unshift(searchKeyword);

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
          <li
            className="flex items-center justify-center pr-3"
            onClick={() => setIsOpen(true)}
            role="presentation"
          >
            <button className="flex items-center justify-center">
              <div className="relative cursor-pointer">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M144 208c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm112 0c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                </svg>
                {/* <div className="absolute -top-2 w-[24px] h-[24px] font-semibold -right-3 rounded-[50%] p-1 text-[11px] bg-jngreen text-center">
                  0
                </div> */}
              </div>
              <p className="ml-5">채팅하기</p>
            </button>
          </li>
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
