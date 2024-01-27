import styles from '../pages/Board.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function UpdateCommentBoard({ comment_id }) {
  const [regReplyComment, setRegReplyComment] = useState({
    contents: '',
  });

  const handleSubmit = async () => {
    axios({
      method: 'POST',
      url: `http://localhost:8090/comment/update`,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json', // Content-Type을 반드시 이렇게 하여야 한다.
      },
      data: {
        contents: regReplyComment.contents,
        id: comment_id,
      },
    });
  };

  console.log(regReplyComment);

  return (
    <div className="pt-4 lg:pt-0">
      <form className={styles.aa22} onSubmit={handleSubmit}>
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
            <button className={styles.commentButton}>수정</button>
          </div>
        </div>
      </form>
    </div>
  );
}
