import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
// import { Button } from 'react-bootstrap/';
import axios from 'axios';
import styles from './NoticeDetail.module.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ToastContext from '../context/ToastContext';

export default function NoticeDetail() {
  const navigator = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const params = useParams();
  const [role, setRole] = useState('');
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    axios.get('http://3.34.99.253:8090/notice/list').then((result) => {
      setData(result.data);
    });
    //role 정보 담기
    const token = localStorage.getItem('login');
    token
      ? axios
          .get('http://3.34.99.253:8090/user/info/role', {
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

  const Delete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios.delete('http://3.34.99.253:8090/notice/' + params.id).then(() => {
        toastContext.setToastMessage(['게시글이 삭제되었습니다']);
        navigator('/notice');
      });
    }
  };

  return (
    <>
      {data ? (
        <div className={styles.body}>
          <div className={styles.top_title}>
            <div className={styles.title_text}>
              {data[data.findIndex((v) => v.notice_id == id)].notice_title}
            </div>
            <div className={styles.sub_head}>
              <div className={styles.date_div}>
                {data[data.findIndex((v) => v.notice_id == id)].reg_time}
              </div>
              {role == 'ADMIN' ? (
                <div className={styles.edit}>
                  |&nbsp;&nbsp;
                  <EditOutlined
                    onClick={() => {
                      navigator('/notice/update/' + params.id);
                      MoveToTop();
                    }}
                    className={styles.button}
                  />
                  <DeleteOutlined onClick={Delete} className={styles.button} />
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <div className={styles.contents_text}>
              {data[data.findIndex((v) => v.notice_id == id)].notice_contents}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
