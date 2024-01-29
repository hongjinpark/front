import styles from './Board.module.css';
import { detailDate } from '../utils/util';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReplyCommentBoard from './ReplyCommentBoard';
import ReplyCommentList from '../pages/ReplyCommentList';
import useAuth from '../hooks/useAuth';
import UpdateCommentBoard from '../pages/UpdateCommentBoard';
import ToastContext from '../context/ToastContext';

export default function CommentList({ comment }) {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigator = useNavigate();
  const toastContext = useContext(ToastContext);
  const [visible, setVisible] = useState([false, false, false, false, false]);
  const [updateVisible, setUpdateVisible] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [regComment, setRegComment] = useState({
    contents: '',
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem('login');

    token
      ? axios({
          method: 'POST',
          url: `http://localhost:8090/comment/new`,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json', // Content-Type을 반드시 이렇게 하여야 한다.
            'Authorization': `Bearer ${token}`,
          },
          data: {
            board: id,
            contents: regComment.contents,
          },
        }).then(() => {
          toastContext.setToastMessage(['등록되었습니다.']);
        })
      : alert('로그인이 필요합니다.');
  };

  console.log(regComment);

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
    <>
      <div>
        <div className="pt-4 lg:pt-0">
          {comment.map((comment, i) => (
            <div key={i} className={styles.aa5}>
              <div className={styles.commentImgUrl}>
                <img
                  className={styles.commentImageStyle}
                  alt=""
                  src={require(`../assets${comment.img_url}`)}
                />
              </div>
              <div>
                <div className={styles.aa6}>
                  <div className={styles.w7pzr95}>{comment.nickname}</div>
                  <div className={styles.w7pzr94}>
                    {detailDate(comment.update_time)}
                  </div>
                </div>

                <div className={styles.commentLike}>
                  <div>{comment.contents}</div>
                </div>
                <div className={styles.commentLike}>
                  <div>
                    <button
                      className={styles.w7pzr94}
                      onClick={() => {
                        setVisible((prev) => {
                          const updatedState = [...prev];
                          updatedState[i] = !updatedState[i];
                          return updatedState;
                        });
                      }}
                    >
                      {auth?.id != null
                        ? visible[i]
                          ? '숨기기'
                          : '답글쓰기'
                        : ''}
                    </button>
                    {comment.user_id == auth?.id ? (
                      <>
                        <span className={`${styles.w7pzr94} ${styles.update}`}>
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
                                onRemove(comment.comment_id); // 선택한 해당요소 id값을 전달
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
                    <div>
                      {updateVisible[i] && (
                        <UpdateCommentBoard comment_id={comment.comment_id} />
                      )}
                    </div>
                    <div>
                      {visible[i] && (
                        <ReplyCommentBoard
                          commentGroup={comment.comment_group}
                        />
                      )}
                    </div>
                    <ReplyCommentList commentGroup={comment.comment_group} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <form className={styles.aa2} onSubmit={handleSubmit}>
            <div className={styles.commentAddContent}>
              <textarea
                type="text"
                id="contents"
                name="contents"
                autoComplete="off"
                maxLength="1000"
                className="shrink-0 bg-transparent placeholder:text-[#9CA3AF] outline-none resize-none text-md h-16 w-full pre-wrap"
                placeholder="댓글을 입력해주세요"
                onChange={(e) =>
                  setRegComment({ ...regComment, contents: e.target.value })
                }
              ></textarea>
            </div>
            <div>
              <div className={styles.commentAddContent2}>
                <button className={styles.commentButton}>등록</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
