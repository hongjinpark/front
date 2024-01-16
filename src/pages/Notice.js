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
    console.log(role);
    console.log(board);
  }, []);

  return (
    <section className={styles.notice}>
      <div className={styles[`page-title`]}>
        <div className={styles.container}>
          <h3>공지사항</h3>
        </div>
      </div>

      <div id="board-list">
        <div className={styles.container}>
          <Outlet />
          <table className={styles[`board-table`]}>
            <thead>
              <tr>
                <th scope="col" className={styles[`th-title`]}>
                  제목
                </th>
                <th scope="col" className={styles[`th-date`]}>
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              {board
                ? board.map(function (a, i) {
                    return <List i={i} key={i} />;
                  })
                : null}
            </tbody>
          </table>
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
      </div>
    </section>
  );

  function List(props) {
    return (
      <tr>
        <th>
          <a href={'/notice/' + board[props.i].notice_id}>
            {board[props.i].notice_title}
          </a>
        </th>
        <td>{board[props.i].reg_time}</td>
      </tr>
    );
  }
}
