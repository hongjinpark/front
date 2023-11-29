import styles from './NoticeWrite.module.css';
import { Button } from 'react-bootstrap/';
import axios from 'axios';
import { useState } from 'react';

export default function NoticeDetail() {
  const token = localStorage.getItem('login');

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');

  const saveTitle = (event) => {
    setTitle(event.target.value);
    console.log(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.top_title}>
          <input
            className={styles.title_text}
            placeholder="제목"
            value={titleValue}
          ></input>
        </div>

        <textarea
          className={styles.contents_text}
          placeholder="내용"
          value={contentsValue}
        ></textarea>
      </div>
      <Button
        variant="outline-dark"
        onClick={() => {
          axios.post(
            'http://localhost:8090/notice/new',
            {
              noticeContents: { saveContent },
              noticeTitle: { saveTitle },
            },
            { headers: { Authorization: token } }
          );
        }}
        className={styles.button}
      >
        저장
      </Button>
      <button
        onClick={() => {
          console.log(token);
        }}
      >
        test
      </button>
    </div>
  );
}
