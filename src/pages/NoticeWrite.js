import styles from './NoticeWrite.module.css';
import { Button } from 'react-bootstrap/';
import axios from 'axios';

export default function NoticeDetail() {
  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.top_title}>
          <input className={styles.title_text} placeholder="제목"></input>
        </div>

        <textarea
          className={styles.contents_text}
          placeholder="내용"
        ></textarea>
      </div>
      <Button
        variant="outline-dark"
        onClick={() => {
          axios.post('http://localhost:8090/notice/new', {
            notice_contents: '테스트',
            notice_title: '리액트',
          });
        }}
        className={styles.button}
      >
        저장
      </Button>
    </div>
  );
}
