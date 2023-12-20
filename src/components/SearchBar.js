import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function SearchBar({ className }) {
  const [keywordList, setKeywordList] = useState([]);

  const updateKeyword = [...keywordList];

  const handleClearKeyword = () => {
    localStorage.removeItem('keyword');
    setKeywordList([]);
  };

  const handleRemoveKeyword = (index) => {
    updateKeyword.splice(index, 1);
    localStorage.setItem('keyword', JSON.stringify(updateKeyword));
    setKeywordList(updateKeyword);
  };

  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem('keyword')) || [];
    setKeywordList(storedKeywords);
  }, []);

  return (
    <div className={`${styles.recentSearch} ${className}`}>
      <div className={styles.recentTitle}>
        <h1>최근 검색어</h1>
        <button onClick={handleClearKeyword}>
          <p className={styles.recentDelete}>전체 삭제</p>
        </button>
      </div>
      <div className={styles.recentList}>
        <ul className={styles.recentLists}>
          {keywordList.map((e, index) => {
            return (
              <>
                {keywordList ? (
                  <li key={index}>
                    <button
                      onClick={() => handleRemoveKeyword(index)}
                      className={styles.recentWord}
                      value={index}
                    >
                      {e}
                      <FontAwesomeIcon
                        icon={faXmark}
                        className={styles.xmark}
                      />
                    </button>
                  </li>
                ) : (
                  <h4>검색어 내역이 없습니다.</h4>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
