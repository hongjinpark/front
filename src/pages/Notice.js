import { Table, Button } from 'react-bootstrap/';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Noitce() {
  let navigator = useNavigate();
  let [board, setBoard] = useState();

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      // console.log(result.data);
      setBoard(result.data);
      // console.log(board);
    });
  }, []);

  return (
    <>
      <Outlet />
      <Button variant="outline-primary">글쓰기</Button>{' '}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {board
            ? board.map(function (a, i) {
                return <List i={i} key={i} />;
              })
            : null}
        </tbody>
      </Table>
    </>
  );

  function List(props) {
    return (
      <tr>
        <td>{board[props.i].notice_id}</td>
        <td
          onClick={() => {
            navigator('/notice/' + board[props.i].notice_id);
          }}
        >
          {board[props.i].notice_title}
        </td>
        <td>{board[props.i].reg_time}</td>
      </tr>
    );
  }
}
