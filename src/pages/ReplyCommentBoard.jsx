import styles from '../pages/Board.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ReplyCommentBoard({ commentGroup }) {
  const { id } = useParams();
  const [regReplyComment, setRegReplyComment] = useState({
    contents: '',
    commentGroup: '',
  });

  const handleSubmit = async () => {
    const token = localStorage.getItem('login');

    token
      ? axios({
          method: 'POST',
          url: `http://localhost:8090/comment/renew`,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json', // Content-Type을 반드시 이렇게 하여야 한다.
            'Authorization': `Bearer ${token}`,
          },
          data: {
            board: id,
            contents: regReplyComment.contents,
            commentGroup: commentGroup,
          },
        })
      : null;
  };

  console.log(regReplyComment);

  return (
    <div className="pt-4 lg:pt-0">
      <form className={styles.aa2} onSubmit={handleSubmit}>
        <div className={styles.commentAddReplyContent}>
          <textarea
            type="text"
            id="contents"
            name="contents"
            autoComplete="off"
            maxLength="1000"
            className="shrink-0 bg-transparent placeholder:text-[#9CA3AF] outline-none resize-none text-md h-16 w-full pre-wrap"
            placeholder="댓글을 입력해주세요"
            onChange={(e) =>
              setRegReplyComment({
                ...regReplyComment,
                contents: e.target.value,
              })
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
  );
}
