/* eslint-disable no-useless-catch */
import styles from './Board.module.css';
import { getApi } from '../api/axios';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import BoardList from './BoardList';
import Pagination from './Pagination';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Board = () => {
  const [limit, setLimit] = useState(3);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const navigator = useNavigate();

  const boardLists = async () => {
    let path = `/board/list`;
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);
      setList(getData);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    boardLists();
    setLimit(20);
  }, []);

  return (
    <Container className={styles.container}>
      <div className={styles.boards}>
        <BoardList list={list.slice(offset, offset + limit)} />
      </div>
      <Button
        className={styles.btn_post}
        onClick={() => {
          navigator('/board/write');
        }}
        variant="outline-secondary"
      >
        등록
      </Button>

      <Pagination
        total={list.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default Board;
