import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap/';
import axios from 'axios';
import styles from './NoticeDetail.module.css';

export default function NoticeDetail() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const params = useParams();
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8090/notice/list').then((result) => {
      setData(result.data);
    });
    //role 정보 담기
    const token = localStorage.getItem('login');
    token
      ? axios
          .get('http://localhost:8090/user/info/role', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            setRole(result.data);
          })
      : null;
  }, []);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {data ? (
        <div className={styles.box}>
          <div className={styles.top_title}>
            <div className={styles.title_text}>
              {data[data.findIndex((v) => v.notice_id == id)].notice_title}
            </div>

            <div className={styles.date_div}>
              {data[data.findIndex((v) => v.notice_id == id)].reg_time}
            </div>
          </div>

          <div>
            <div className={styles.contents_text}>
              {data[data.findIndex((v) => v.notice_id == id)].notice_contents}
            </div>
          </div>
        </div>
      ) : null}
      {role == 'ADMIN' ? (
        <Button
          variant="outline-dark"
          onClick={() => {
            if (window.confirm('삭제하시겠습니까?')) {
              axios
                .delete('http://localhost:8090/notice/' + params.id)
                .then(() => {
                  navigator('/notice');
                  window.location.reload('/notice');
                  alert('삭제 완료');
                });
            } else {
              alert('취소했습니다');
            }
          }}
        >
          글삭제
        </Button>
      ) : null}
      {role == 'ADMIN' ? (
        <Button
          variant="outline-dark"
          onClick={() => {
            navigator('/notice/update/' + params.id);
            MoveToTop();
          }}
        >
          글수정
        </Button>
      ) : null}
    </>
  );
}
