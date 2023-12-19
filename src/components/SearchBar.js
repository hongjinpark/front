import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({ className, keyword }) {
  // 1. 검색 버튼 선택 시 검색한 키워드를 담기 위한 handleAddKeyword
  // 2. 삭제 버튼을 눌렀을 때 눌린 해당 키워드만을 지우기 위한 handleRemoveKeyword
  // 3. 전체 삭제를 눌렀을 때 모든 Keyword 상태값을 지우기 위한 handleClearKeywords

  // search-bar 컴포넌트에서 검색버튼을 눌렀을 때 search 페이지의 keyword 상태값에 계속 추가가 되고 (localStorage로 추가가 되어야함. 그래야 새로고침이나 창을 꺼도 그 기록값이 사라지지 않음)
  // 추가된 상태값들을 map으로 리스트를 뽑아 히스토리에 뿌린다.

  // 뽑힌 리스트의 삭제를 누르면 그 요소 버튼의 unique한 id값과 keyword 배열안에 들어있는 id 값을 필터하여 삭제시킬 값을 제거한다.

  // 전체 삭제를 누르면 모든 keyword 값을 제거한다.
  // - 검색창 remove 버튼은 글자를 입력해야만 나온다.
  // - 엔터를 눌러도 검색버튼이 trigger가 되도록 한다.
  // - keyword가 등록되면 value 값을 다시 초기화 시킨다.

  console.log('keywrod : ', keyword);

  return (
    <div className={`${styles.recentSearch} ${className}`}>
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
  );
}
