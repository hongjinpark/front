import styles from './Board.module.css';
import { format } from 'date-fns';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function CommentList({ comment }) {
  const { id } = useParams();
  const navigate = useNavigate();
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
        })
      : alert('로그인이 필요합니다.');
    navigate('/login', { replace: true });
  };

  console.log(regComment);

  return (
    <>
      <div>
        <div className="pt-4 lg:pt-0">
          {comment.map((comment, index) => (
            <div key={index} className={styles.aa5}>
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
                    {format(comment.update_time, 'yyyy-MM-dd hh:mm:ss')}
                  </div>
                </div>

                <div className={styles.commentLike}>
                  <div>{comment.contents}</div>
                  <span className={styles.commentLikes}>
                    {/*<span className="infd-icon ac-like-button__icon--visible">
                      <svg
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill="#e5503c"
                          d="M9.333 13.605c-.328.205-.602.365-.795.473-.102.057-.205.113-.308.168h-.002c-.143.074-.313.074-.456 0-.105-.054-.208-.11-.31-.168-.193-.108-.467-.268-.795-.473-.655-.41-1.53-1.007-2.408-1.754C2.534 10.382.667 8.22.667 5.676c0-2.308 1.886-4.01 3.824-4.01 1.529 0 2.763.818 3.509 2.07.746-1.252 1.98-2.07 3.509-2.07 1.938 0 3.824 1.702 3.824 4.01 0 2.545-1.867 4.706-3.592 6.175-.878.747-1.753 1.344-2.408 1.754z"
                        ></path>
                      </svg>
                    </span>*/}
                    <span className="infd-icon">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#adb5bd"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.49095 2.66666C3.10493 2.66666 1.66663 3.92028 1.66663 5.67567C1.66663 7.74725 3.21569 9.64919 4.90742 11.0894C5.73796 11.7965 6.571 12.3653 7.19759 12.7576C7.51037 12.9534 7.7704 13.1045 7.95123 13.2061C7.96818 13.2156 7.98443 13.2247 7.99996 13.2333C8.01549 13.2247 8.03174 13.2156 8.04869 13.2061C8.22952 13.1045 8.48955 12.9534 8.80233 12.7576C9.42892 12.3653 10.262 11.7965 11.0925 11.0894C12.7842 9.64919 14.3333 7.74725 14.3333 5.67567C14.3333 3.92028 12.895 2.66666 11.509 2.66666C10.1054 2.66666 8.9751 3.59266 8.4743 5.09505C8.40624 5.29922 8.21518 5.43693 7.99996 5.43693C7.78474 5.43693 7.59368 5.29922 7.52562 5.09505C7.02482 3.59266 5.89453 2.66666 4.49095 2.66666ZM7.99996 13.8018L8.22836 14.2466C8.08499 14.3202 7.91493 14.3202 7.77156 14.2466L7.99996 13.8018ZM0.666626 5.67567C0.666626 3.368 2.55265 1.66666 4.49095 1.66666C6.01983 1.66666 7.25381 2.48414 7.99996 3.73655C8.74611 2.48414 9.98009 1.66666 11.509 1.66666C13.4473 1.66666 15.3333 3.368 15.3333 5.67567C15.3333 8.22121 13.4657 10.3823 11.7407 11.8509C10.863 12.5982 9.98767 13.1953 9.33301 13.6052C9.00516 13.8104 8.73133 13.9696 8.53847 14.0779C8.44201 14.1321 8.36571 14.1737 8.31292 14.2019C8.28653 14.2161 8.26601 14.2269 8.25177 14.2344L8.2352 14.2431L8.23054 14.2455L8.22914 14.2462C8.22897 14.2463 8.22836 14.2466 7.99996 13.8018C7.77156 14.2466 7.77173 14.2467 7.77156 14.2466L7.76938 14.2455L7.76472 14.2431L7.74815 14.2344C7.73391 14.2269 7.71339 14.2161 7.687 14.2019C7.63421 14.1737 7.55791 14.1321 7.46145 14.0779C7.26858 13.9696 6.99476 13.8104 6.66691 13.6052C6.01225 13.1953 5.13695 12.5982 4.25917 11.8509C2.53423 10.3823 0.666626 8.22121 0.666626 5.67567Z"
                        ></path>
                      </svg>
                    </span>
                    {/* <span className="ac-like-button__count">2</span>*/}
                  </span>
                </div>
                <div className={styles.commentLike}>
                  <div className={styles.w7pzr94}>답글쓰기</div>
                </div>
              </div>
            </div>
          ))}
          <form onSubmit={handleSubmit}>
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
