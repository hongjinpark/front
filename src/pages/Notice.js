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
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      setBoard(result.data.reverse());
    });
    //role 정보 담기
    const token = localStorage.getItem('login');
    token
      ? axios
          .get('http://localhost:8090/user/info/role', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setRole(result.data);
          })
      : null;
  }, []);

  return (
    <div className={styles.body}>
      <h2 className={styles.logo}> 공지사항 </h2>
      <Outlet />

      <div className={styles.list}>
        <div className={`${styles.list_tit} ${styles.list_grid}`}>
          <div> 제목 </div>
          <div className={styles.acenter}> 작성일 </div>
        </div>

        {board
          ? board.map(function (a, i) {
              return <List i={i} key={i} />;
            })
          : null}
      </div>

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
