import styles from './Board.module.css';

export default function Board() {
  return (
    <section className={styles.notice}>
      <div className={styles[`page-title`]}>
        <div className={styles.container}>
          <h3>공지사항</h3>
        </div>
      </div>
      <div id="board-search">
        <div className={styles.container}>
          <div className={styles.search - window}>
            <form action="">
              <div className={styles[`search-wrap`]}>
                {/* <label className={styles.blind}>공지사항 내용 검색</label> */}
                <input
                  id="search"
                  type="search"
                  name=""
                  placeholder="검색어를 입력해주세요."
                  value=""
                ></input>
                <button
                  type="submit"
                  className={`${styles.btn} ${styles[`btn-dark`]}`}
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="board-list">
        <div className={styles.container}>
          <table className={styles[`board-table`]}>
            <thead>
              <tr>
                <th scope="col" className={styles[`th-num`]}>
                  번호
                </th>
                <th scope="col" className={styles[`th-title`]}>
                  제목
                </th>
                <th scope="col" className={styles[`th-date`]}>
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <th>
                  <a href="#!">[공지사항] 개인정보 처리방침 변경안내처리방침</a>
                  <p>테스트</p>
                </th>
                <td>2017.07.13</td>
              </tr>

              <tr>
                <td>2</td>
                <th>
                  <a href="#!">공지사항 안내입니다. 이용해주셔서 감사합니다</a>
                </th>
                <td>2017.06.15</td>
              </tr>

              <tr>
                <td>1</td>
                <th>
                  <a href="#!">공지사항 안내입니다. 이용해주셔서 감사합니다</a>
                </th>
                <td>2017.06.15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
