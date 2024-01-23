import styles from './NoticeWrite.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ToastPopup from '../components/ToastPopup';

export default function NoticeDetail() {
  const navigator = useNavigate();
  // const role = localStorage.getItem('role');

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');
  const [toast, setToast] = useState(false);
  const [toastContent, setToastConstent] = useState('');

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
  };
  const Save = () => {
    if (titleValue !== '' && contentsValue !== '') {
      axios
        .post('http://localhost:8090/notice/new', {
          noticeContents: contentsValue,
          noticeTitle: titleValue,
        })
        .then(() => {
          navigator('/notice');
          window.location.reload('/notice');
        });
    } else if (titleValue == '') {
      setToastConstent('제목을 입력해주세요');
      setToast(true);
    } else {
      setToast(true);
      setToastConstent('내용을 입력해주세요');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <h3>공지사항 글쓰기</h3>
        <Button
          variant="outline-secondary"
          className={styles.save}
          onClick={Save}
        >
          등록
        </Button>
      </div>
      <div className={styles.top_title}>
        <input
          className={styles.title_text}
          placeholder="제목을 입력해주세요"
          defaultValue={titleValue}
          onChange={saveTitle}
        ></input>
      </div>
      <div className={styles.buttom_contents}>
        <textarea
          className={styles.contents_text}
          placeholder="내용을 입력해주세요"
          defaultValue={contentsValue}
          onChange={saveContent}
        ></textarea>
      </div>

      <ToastPopup toast={toast} setToast={setToast} text={toastContent} />
    </div>
  );
}
