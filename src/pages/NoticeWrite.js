import styles from './Write.module.css';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ToastContext from '../context/ToastContext';

export default function NoticeDetail() {
  const navigator = useNavigate();
  // const role = localStorage.getItem('role');

  const [titleValue, setTitle] = useState('');
  const [contentsValue, setcontents] = useState('');
  const toastContext = useContext(ToastContext);

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };
  const saveContent = (event) => {
    setcontents(event.target.value);
  };
  const Save = () => {
    if (titleValue !== '' && contentsValue !== '') {
      axios
        .post('http://3.34.99.253:8090/notice/new', {
          noticeContents: contentsValue,
          noticeTitle: titleValue,
        })
        .then(() => {
          toastContext.setToastMessage(['작성이 완료되었습니다']);
          navigator('/notice', { replace: true });
        });
    } else if (titleValue == '') {
      toastContext.setToastMessage(['제목을 입력해주세요']);
    } else {
      toastContext.setToastMessage(['내용을 입력해주세요']);
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
    </div>
  );
}
