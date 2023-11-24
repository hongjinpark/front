import { Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Notice.module.css';
import styles from './Notice.module.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Noitce() {
  const navigator = useNavigate();
  const [board, setBoard] = useState();

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      // console.log(result.data);
      setBoard(result.data);
      // console.log(board);
    });
  }, []);

  return (
    <div className={styles.body}>
      <Outlet />
      <Button variant="outline-dark">글쓰기</Button>
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
