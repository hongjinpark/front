import styles from './NoticeWrite.module.css';
import { Button } from 'react-bootstrap/';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoticeDetail() {
  // const token = localStorage.getItem('login');
  const navigator = useNavigate();

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
  };
  const role = localStorage.getItem('user');
  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.top_title}>
          <input
            className={styles.title_text}
            placeholder="제목"
            defaultValue={titleValue}
            onChange={saveTitle}
          ></input>
        </div>

        <textarea
          className={styles.contents_text}
          placeholder="내용"
          defaultValue={contentsValue}
          onChange={saveContent}
        ></textarea>
      </div>
      <Button
        variant="outline-dark"
        onClick={() => {
          axios
            .post('http://localhost:8090/notice/new', {
              noticeContents: contentsValue,
              noticeTitle: titleValue,
            })
            .then(() => {
              navigator('/notice');
              window.location.reload('/notice');
              alert('저장 완료.');
            });
        }}
        className={styles.button}
      >
        저장
      </Button>
      <button
        onClick={() => {
          console.log(role);
          console.log(typeof role);
        }}
      >
        test
      </button>
    </div>
  );
}
