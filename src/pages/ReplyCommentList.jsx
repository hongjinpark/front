import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../pages/Board.module.css';
import { format } from 'date-fns';
import axios from 'axios';

export default function ReplyCommentList({ commentGroup }) {
  const { id } = useParams();
  const [list, setList] = useState([]);

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

  return (
    <div>
      {list.map((list, i) => (
        <div key={i} className={styles.aa5}>
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
                {format(list.update_time, 'yyyy-MM-dd hh:mm:ss')}
              </div>
            </div>

            <div className={styles.replyCommentLike}>
              <div className={styles.aa36}>{list.contents}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
