// eslint-disable-next-line no-useless-catch
import { getApi } from '../api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import styles from '../pages/Board.module.css';
import BoardDetailList from '../pages/BoardDetailList';
import CommentList from './CommentList';
import Pagination from './Pagination';

const BoardDetail = () => {
  /*const [list, setList] = useState({
    userId: '',
    regionId: '',
    bdSubject: '',
    bdContents: '',
    boardImageDtoList: [],
    userInfoDtoList: [],
  });*/
  const [list, setList] = useState([]);
  const [boardImageDtoList, setBoardImageDtoList] = useState([]);
  const [userInfoDtoList, setUserInfoDtoList] = useState([]);
  const [regionDtoList, setRegionDtoList] = useState([]);

  //페이지네이션
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [comment, setComment] = useState([]);
  const { id } = useParams();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const boardLists = async () => {
    let path = `/board/detail/${id}`;

    // eslint-disable-next-line no-useless-catch
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);
      setList(getData);
      setBoardImageDtoList(getData.boardImageDtoList);
      setUserInfoDtoList(getData.userInfoDtoList);
      setRegionDtoList(getData.regionDtoList);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    boardLists();
    commentLists();
    setLimit(10);
    console.log(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const commentLists = async () => {
    let path = `/comment/list/${id}`;

    // eslint-disable-next-line no-useless-catch
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);
      setComment(getData);
    } catch (e) {
      throw e;
    }
  };

  return (
    <Container className={styles.container}>
      <BoardDetailList
        params={id}
        list={list}
        boardImageDtoList={boardImageDtoList}
        userInfoDtoList={userInfoDtoList}
        regionDtoList={regionDtoList}
      />
      <div className={styles.commentContent}>
        <CommentList comment={comment.slice(offset, offset + limit)} />
      </div>

      <Pagination
        total={comment.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </Container>
  );
};

export default BoardDetail;
