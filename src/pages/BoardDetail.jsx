// eslint-disable-next-line no-useless-catch
import { getApi } from '../api/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import styles from '../pages/Board.module.css';
import BoardDetailList from '../pages/BoardDetailList';
import CommentList from '../pages/CommentList';

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

  const [comment, setComment] = useState([]);
  const { id } = useParams();

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
    console.log(list);
  }, []);

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

  useEffect(() => {
    commentLists();
    console.log(comment);
  }, []);

  return (
    <Container className={styles.container}>
      <div>
        <BoardDetailList
          list={list}
          boardImageDtoList={boardImageDtoList}
          userInfoDtoList={userInfoDtoList}
          regionDtoList={regionDtoList}
        />
      </div>
      <div className={styles.commentContent}>
        <CommentList comment={comment} />
      </div>
    </Container>
  );
};

export default BoardDetail;
