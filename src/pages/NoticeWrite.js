import styles from './NoticeWrite.module.css';
import { Button } from 'react-bootstrap/';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NoticeDetail() {
  const navigator = useNavigate();
  // const role = localStorage.getItem('role');

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
  };

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
          if (titleValue !== '' && contentsValue !== '') {
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
          } else if (titleValue == '') {
            alert('제목을 입력해주세요');
          } else {
            alert('내용을 입력해주세요');
          }
        }}
        className={styles.button}
      >
        저장
      </Button>
    </div>
  );
}
