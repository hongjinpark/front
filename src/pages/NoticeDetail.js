import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap/';
import axios from 'axios';
import styles from './NoticeDetail.module.css';

export default function NoticeDetail() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [board, setBoard] = useState();
  const params = useParams();

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      setBoard(result.data);
    });
  }, []);

  return (
    <>
      {board ? (
        <div className={styles.box}>
          <div className={styles.top_title}>
            <div className={styles.title_text}>
              {board[board.findIndex((v) => v.notice_id == id)].notice_title}
            </div>

            <div className={styles.date_div}>
              {board[board.findIndex((v) => v.notice_id == id)].reg_time}
            </div>
          </div>

          <div>
            <div className={styles.contents_text}>
              {board[board.findIndex((v) => v.notice_id == id)].notice_contents}
            </div>
          </div>
        </div>
      ) : null}
      <Button
        variant="outline-dark"
        onClick={() => {
          axios.delete('http://localhost:8090/notice/' + params.id).then(() => {
            navigator('/notice');
            window.location.reload('/notice');
            alert('삭제 완료.');
          });
        }}
      >
        글삭제
      </Button>
    </>
  );
}
