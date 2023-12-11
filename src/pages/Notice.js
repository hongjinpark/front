import { Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Notice.module.css';
import styles from './Notice.module.css';
// import { Pagination } from '@mui/material';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Noitce() {
  const navigator = useNavigate();
  const [board, setBoard] = useState();
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      setBoard(result.data);
    });
  }, []);

  //Pagination
  // const lastPage = board
  //   ? board.length % 10
  //     ? parseInt(board.length / 5)
  //     : parseInt(board.length / 5) + 1
  //   : null;

  return (
    <div className={styles.body}>
      <Outlet />

      <div className={styles.list}>
        <div className={`${styles.list_tit} ${styles.list_grid}`}>
          <div> 번호 </div>
          <div> 제목 </div>
          <div className={styles.acenter}> 날짜 </div>
        </div>

        {board
          ? board.map(function (a, i) {
              return <List i={i} key={i} />;
            })
          : null}
      </div>

      {/* <Pagination
        className={styles.pagination}
        page={5}
        count={lastPage}
        defaultpage={1}
      /> */}

      <Button
        className={styles.button}
        onClick={() => {
          navigator('/notice');
          MoveToTop();
        }}
        variant="outline-dark"
      >
        목록
      </Button>
      {role == 'ADMIN' ? (
        <Button
          className={styles.button}
          onClick={() => {
            navigator('/notice/write');
            MoveToTop();
          }}
          variant="outline-dark"
        >
          글쓰기
        </Button>
      ) : null}
    </div>
  );

  function List(props) {
    const [hover, setHover] = useState(false);
    return (
      <div className={`${styles.list_data} ${styles.list_grid}`}>
        <div>{board[props.i].notice_id}</div>
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            navigator('/notice/' + board[props.i].notice_id);
            MoveToTop();
          }}
          className={`${styles.title} ${hover == true ? styles.hover : ''}`}
          role="presentation"
        >
          {board[props.i].notice_title}
        </div>
        <div className={styles.acenter}>{board[props.i].reg_time}</div>
      </div>
    );
  }
}
