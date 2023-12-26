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
    // console.log('newKeywords : ', newKeywords[index]);
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
    <div className={`${styles.recentSearch} ${className}`}>
      <div className={styles.recentTitle}>
        <h1>최근 검색어</h1>
        <button onClick={handleClearKeyword}>
          <p className={styles.recentDelete}>전체 삭제</p>
        </button>
      </div>
      <div className={styles.recentList}>
        {keywordList.reverse().map((e, index) => {
          return (
            <ul key={index}>
              {keywordList ? (
                <li>
                  <button className={styles.recentWord}>
                    <span
                      value={e}
                      onClick={() => handleMovePage({ e })}
                      role="presentation"
                    >
                      {e}
                    </span>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className={styles.xmark}
                      onClick={() => handleRemoveKeyword(index)}
                    />
                  </button>
                </li>
              ) : (
                <li>검색어 내역이 없습니다.</li>
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
}
