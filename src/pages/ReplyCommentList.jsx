import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import styles from '../pages/Board.module.css';
import { detailDate } from '../utils/util';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import UpdateCommentBoard from '../pages/UpdateCommentBoard';
import ToastContext from '../context/ToastContext';

export default function ReplyCommentList({ commentGroup }) {
  const { id } = useParams();
  const [list, setList] = useState([]);
  const { auth } = useAuth();
  const navigator = useNavigate();
  const toastContext = useContext(ToastContext);
  const [updateVisible, setUpdateVisible] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:8090/comment/list/reply/${id}`,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json', // Content-Type을 반드시 이렇게 하여야 한다.
      },
      params: {
        commentGroup: commentGroup,
      },
    }).then((result) => {
      setList(result.data);
    });
  }, []);

  const onRemove = (targetId) => {
    axios({
      method: 'DELETE',
      url: `http://localhost:8090/comment/delete/${targetId}`,
      mode: 'cors',
    }).then(() => {
      navigator(`/board/${id}`);
      window.location.reload('/board/${id}');
    });
    toastContext.setToastMessage(['삭제되었습니다']);
  };

  return (
    <div>
      {list.map((list, i) => (
        <div key={i} className={styles.aa55}>
          <div className={styles.replyCommentImgUrl}>
            <img
              className={styles.commentImageStyle}
              alt=""
              src={require(`../assets${list.img_url}`)}
            />
          </div>
          <div>
            <div className={styles.aa26}>
              <div className={styles.w7pzr95}>{list.nickname}</div>
              <div className={styles.w7pzr94}>
                {detailDate(list.update_time)}
              </div>
            </div>
            <div className={styles.replyCommentLike}>
              <div className={styles.aa36}>{list.contents}</div>
              <div>
                {list.user_id == auth?.id ? (
                  <>
                    <span className={`${styles.w7pzr94} ${styles.update1}`}>
                      <button
                        className={styles.w7pzr94}
                        onClick={() => {
                          setUpdateVisible((prev) => {
                            const updatedState = [...prev];
                            updatedState[i] = !updatedState[i];
                            return updatedState;
                          });
                        }}
                      >
                        {updateVisible[i] ? '숨기기' : '수정'}
                      </button>
                    </span>
                    <span className={`${styles.w7pzr94} ${styles.update}`}>
                      <button
                        onClick={() => {
                          if (window.confirm(`삭제하시겠습니까?`)) {
                            onRemove(list.comment_id); // 선택한 해당요소 id값을 전달
                          }
                        }}
                      >
                        삭제
                      </button>
                    </span>
                  </>
                ) : (
                  <></>
                )}
                {updateVisible[i] && (
                  <UpdateCommentBoard comment_id={list.comment_id} />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
