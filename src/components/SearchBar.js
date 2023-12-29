import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ className }) {
  const [keywordList, setKeywordList] = useState([]);
  const navigate = useNavigate();
  let newKeywordLists = keywordList;

  const updateKeyword = [...newKeywordLists];

  const handleClearKeyword = () => {
    localStorage.removeItem('keyword');
    setKeywordList([]);
  };

  const handleRemoveKeyword = (index) => {
    let newKeywords = updateKeyword.reverse();
    newKeywords.splice(index, 1);
    localStorage.setItem('keyword', JSON.stringify(newKeywords));
    setKeywordList(newKeywords);
  };

  const handleMovePage = (e) => {
    let newE = JSON.stringify(e.e);
    newE = newE.replaceAll('"', '');
    let newKeyword = `keyword=${newE}`;
    navigate(`search/${newKeyword}`);
  };

  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem('keyword')) || [];
    setKeywordList(storedKeywords);
  }, []);

  return (
    <div className={`${styles.searchBar} ${styles.recentSearch} ${className}`}>
      <div className={`${styles.searchBar} ${styles.recentTitle}`}>
        <h3 className={`${styles.searchBar} ${styles.recentTtitle}`}>
          최근 검색어
        </h3>
        <button onClick={handleClearKeyword} className={styles.searchBar}>
          <p className={`${styles.searchBar} ${styles.recentDelete}`}>
            전체 삭제
          </p>
        </button>
      </div>
      <div className={`${styles.searchBar} ${styles.recentList}`}>
        {keywordList.reverse().map((e, index) => {
          return (
            <ul key={index} className={styles.searchBar}>
              {keywordList ? (
                <li className={styles.searchBar}>
                  <button
                    className={`${styles.searchBar} ${styles.recentWord}`}
                  >
                    <span
                      value={e}
                      className={styles.searchBar}
                      onClick={() => handleMovePage({ e })}
                      role="presentation"
                    >
                      {e}
                    </span>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={`${styles.xmark}`}
                      onClick={() => handleRemoveKeyword(index)}
                    />
                  </button>
                </li>
              ) : (
                <li className={styles.searchBar}>검색어 내역이 없습니다.</li>
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
