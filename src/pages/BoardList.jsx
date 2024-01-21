import { Link, useLocation } from 'react-router-dom';
import styles from './Board.module.css';

export default function BoardList({ list }) {
  let location = useLocation().pathname;
  if (location === '/') {
    location = true;
  } else if (location === '/search/') {
    location = false;
  }

  if (!list || list.length === 0) {
    return (
      <div className={styles.poductResult}>
        <h1 className={styles.noProduct}>상품 검색 결과가 없습니다.</h1>
      </div>
    );
  } else if (Array.isArray(list)) {
    return (
      <section className={styles._1ff3f302}>
        <div className={styles._11vv8ke2}>
          {list.map((board) => {
            return (
              <div className={styles._11vv8ke3} key={board.boardId}>
                <Link
                  to={`../../board/${board.boardId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <article className={styles.w7pzr90}>
                    <div className={styles.w7pzr96}>
                      <span className={styles.box}>
                        {location ? (
                          <img
                            src={require(`../assets${board.imgUrl}`)}
                            alt="게시글이미지"
                            className={`${styles._19qbbiq0} ${styles.imgBox}`}
                          />
                        ) : (
                          <img
                            src={require(`../assets${board.imgUrl}`)}
                            alt="게시글이미지"
                            className={`${styles._19qbbiq0} ${styles.imgBox}`}
                          />
                        )}
                      </span>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div className={styles.w7pzr97}>
                      <div className={styles.w7pzr93}>{board.bdSubject}</div>
                      <div className={styles.w7pzr94}>{board.regionName}</div>
                      <div className={styles.w7pzr95}>{board.bdContents}</div>
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
