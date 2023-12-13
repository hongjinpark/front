import styles from './NoticeWrite.module.css';
import { Button } from 'react-bootstrap/';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NoticeUpdate() {
  const [data, setData] = useState();
  const navigator = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [contents, setContents] = useState();

  const saveTitle = (event) => {
    setTitle(event.target.value);
  };

  const saveContent = (event) => {
    setContents(event.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      setData(result.data);
    });
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.top_title}>
          <input
            className={styles.title_text}
            placeholder="제목 수정"
            defaultValue={
              data
                ? data[data.findIndex((v) => v.notice_id == id)].notice_title
                : null
            }
            onChange={saveTitle}
          ></input>
        </div>

        <textarea
          className={styles.contents_text}
          placeholder="내용 수정"
          defaultValue={
            data
              ? data[data.findIndex((v) => v.notice_id == id)].notice_contents
              : null
          }
          onChange={saveContent}
        ></textarea>
      </div>
      <Button
        variant="outline-dark"
        onClick={() => {
          axios
            .put('http://localhost:8090/notice/update/' + id, {
              noticeTitle: title,
              noticeContents: contents,
            })
            .then(() => {
              navigator('/notice');
              window.location.reload('/notice');
              alert('수정 완료.');
            });
        }}
        className={styles.button}
      >
        수정
      </Button>
    </div>
  );
}
