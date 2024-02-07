import styles from './NoticeUpdate.module.css';
import { Button } from 'react-bootstrap/';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ToastContext from '../context/ToastContext';

export default function NoticeUpdate() {
  const [data, setData] = useState({ title: '', contents: '' });
  const navigator = useNavigate();
  const { id } = useParams();
  const toastContext = useContext(ToastContext);

  const handleChange = (event) => {
    setData((preFormData) => {
      return {
        ...preFormData,
        [event.target.name]: event.target.value,
      };
    });
  };
  const Save = () => {
    if (data.title !== '' && data.contents !== '') {
      axios
        .put('http://localhost:8090/notice/update/' + id, {
          noticeTitle: data.title,
          noticeContents: data.contents,
        })
        .then(() => {
          console.log(console.log(data));
          toastContext.setToastMessage(['수정이 완료되었습니다']);
          navigator('/notice');
        });
    } else if (data.title == '') {
      toastContext.setToastMessage(['제목을 입력해주세요']);
    } else {
      toastContext.setToastMessage(['내용을 입력해주세요']);
    }
  };

  useEffect(() => {
    function getData() {
      axios.get('http://localhost:8090/notice/list').then((res) => {
        const result = res.data;
        setData({
          title:
            result[result.findIndex((v) => v.notice_id == id)].notice_title,
          contents:
            result[result.findIndex((v) => v.notice_id == id)].notice_contents,
        });
      });
    }
    getData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.head}>
        <h3>공지사항 수정</h3>
        <Button variant="outline-dark" onClick={Save} className={styles.button}>
          수정
        </Button>
      </div>
      <div className={styles.top_title}>
        <input
          name="title"
          className={styles.title_text}
          placeholder="제목을 입력해주세요"
          defaultValue={data.title}
          onInput={handleChange}
        ></input>
      </div>
      <div className={styles.buttom_contents}>
        <textarea
          name="contents"
          className={styles.contents_text}
          placeholder="내용을 입력해주세요"
          defaultValue={data.contents}
          onInput={handleChange}
        ></textarea>
      </div>
    </div>
  );
}
