import styles from './NoticeWrite.module.css';
import { Button } from 'react-bootstrap/';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NoticeUpdate() {
  const [data, setData] = useState({ title: '', contents: '' });
  const navigator = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    setData((preFormData) => {
      return {
        ...preFormData,
        [event.target.name]: event.target.value,
      };
    });
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
    console.log(data);
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.box}>
        <div className={styles.top_title}>
          <input
            name="title"
            className={styles.title_text}
            placeholder="제목 수정"
            defaultValue={data.title}
            onChange={handleChange}
          ></input>
        </div>

        <textarea
          name="contents"
          className={styles.contents_text}
          placeholder="내용 수정"
          defaultValue={data.contents}
          onChange={handleChange}
        ></textarea>
      </div>
      <Button
        variant="outline-dark"
        onClick={() => {
          if (data.title !== '' && data.contents !== '') {
            axios
              .put('http://localhost:8090/notice/update/' + id, {
                noticeTitle: data.title,
                noticeContents: data.contents,
              })
              .then(() => {
                navigator('/notice');
                window.location.reload('/notice');
                alert('수정 완료.');
              });
          } else if (data.title == '') {
            alert('제목을 입력해 주세요');
          } else {
            alert('내용을 입력해 주세요');
          }
        }}
        className={styles.button}
      >
        수정
      </Button>
    </div>
  );
}
