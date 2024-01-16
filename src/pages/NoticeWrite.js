import styles from './NoticeWrite.module.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveOutlined } from '@ant-design/icons';
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

  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.top_title}>
          <input
            className={styles.title_text}
            placeholder="제목을 입력해주세요"
            defaultValue={titleValue}
            onChange={saveTitle}
          ></input>
        </div>

        <textarea
          className={styles.contents_text}
          placeholder="내용을 입력해주세요"
          defaultValue={contentsValue}
          onChange={saveContent}
        ></textarea>
      </div>
      <SaveOutlined
        className={styles.save}
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
              });
          } else if (titleValue == '') {
            setToastConstent('제목을 입력해주세요');
            setToast(true);
          } else {
            setToast(true);
            setToastConstent('내용을 입력해주세요');
          }
        }}
      />
      {toast && <ToastPopup setToast={setToast} text={toastContent} />}
    </div>
  );
}
