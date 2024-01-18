import styles from './Pagination.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function Pagination({ total, limit, page, setPage }) {
  const [btnActive, setBtnActive] = useState(0); //현재 페이지 활성화 여부
  const numPages = Math.ceil(total / limit); // 총 페이지 수는 올림해야함

  const handlePageBtn = (e, i) => {
    setPage(i + 1);
    setBtnActive(Number(e.target.getAttribute('value')));
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div
          className={styles.pageBtn}
          onClick={() => {
            if (page <= 1) {
              setPage(1);
              setBtnActive(0);
            } else {
              setPage(page - 1);
              setBtnActive(btnActive - 1);
            }
          }}
          disabled={page === 1}
          role="presentation"
        >
          <FontAwesomeIcon className={styles.faAngle} icon={faAngleLeft} />
        </div>
        {numPages > 0 ? (
          Array(numPages)
            .fill()
            .map((_, i) => {
              return (
                <div
                  value={i}
                  key={i + 1}
                  className={
                    i === btnActive
                      ? `${styles.pagination} ${styles.active}`
                      : `${styles.pagination}`
                  }
                  onClick={(e) => handlePageBtn(e, i)}
                  aria-current={page === i + 1 ? 'page' : null}
                  role="presentation"
                >
                  {i + 1}
                </div>
              );
            })
        ) : (
          <div className={`${styles.pagination} ${styles.active}`}>{1}</div>
        )}

        <div
          className={styles.pageBtn}
          // styles.pageBtn
          onClick={() => {
            if (page >= numPages) {
              setPage(numPages);
              setBtnActive(numPages - 1);
            } else {
              setPage(page + 1);
              setBtnActive(btnActive + 1);
            }
          }}
          disabled={page === numPages}
          role="presentation"
        >
          <FontAwesomeIcon className={styles.faAngle} icon={faAngleRight} />
        </div>
      </div>
    </>
  );
}
