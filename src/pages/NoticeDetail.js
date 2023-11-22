import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NoticeDetail() {
  let { id } = useParams();
  let [board, setBoard] = useState();

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      setBoard(result.data);
    });
  }, []);

  return (
    <>
      {board ? (
        <>
          <h1>
            {board[board.findIndex((v) => v.notice_id == id)].notice_title}
          </h1>
          <p>{board[board.findIndex((v) => v.notice_id == id)].reg_time}</p>
          <hr></hr>
          <p>
            {board[board.findIndex((v) => v.notice_id == id)].notice_contents}
          </p>
        </>
      ) : null}
    </>
  );
}
