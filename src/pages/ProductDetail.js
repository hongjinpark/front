/* eslint-disable no-useless-catch */
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Container from '../components/Container';
import Button from '../components/Button';
import Caution from '../components/Caution';
import LikeButton from '../components/LikeButton';
import axios from 'axios';
import ToastPopup from '../components/ToastPopup';

export default function ProductDetail() {
  const { product_id } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem('login');
  const [chattingBox, setChattingBox] = useState(false);

  //관심물품
  const [like, setLike] = useState(false);
  const [toast, setToast] = useState(false);
  const toggleLike = async () => {
    if (like == false) {
      axios.post(
        'http://localhost:8090/attention',
        {
          status: 'Y',
          productId: product_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast(true);
      setLike(true);
    } else {
      axios.post(
        'http://localhost:8090/attention',
        {
          status: 'N',
          productId: product_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLike(false);
    }
  };

  const likeData = async () => {
    if (token) {
      const att = await axios.get('http://localhost:8090/attention/lists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const attStatus =
        att.data.findIndex((i) => i.productId == product_id) != -1
          ? att.data[att.data.findIndex((i) => i.productId == product_id)]
              .status
          : null;
      if (attStatus == 'Y') {
        setLike(true);
      } else if (attStatus == 'N') {
        setLike(false);
      }
    }
  };
  //

  const productLists = async () => {
    let path = `/product/list`;
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);

      setList(getData);
    } catch (e) {
      throw e;
    }
  };

  const handleChatt = () => {
    setChattingBox(true);
  };

  const handleExceptioin = (e) => {
    let newclassName = e.target.className;
    if (newclassName.includes('ProductDetail_chat__V1pwk')) {
      setChattingBox(true);
    } else if (chattingBox === true) {
      setChattingBox(false);
    }
  };

  useEffect(() => {
    productLists();
    likeData();
  }, []);

  useEffect(() => {
    if (!list) return;
    // att.data.findIndex((i) => i.productId == pdId)
    const foundCourse = list.find(
      (e) => Number(e.product_id) == Number(product_id)
    );
    setCourse(foundCourse);
  }, [list, product_id]);

  return (
    <div onClick={handleExceptioin} role="presentation">
      <Container className={styles.container}>
        {course && (
          <>
            <div className={styles.pdInfo}>
              <div className={styles.imgBox}>
                <img
                  src={require(`../assets${course.imgUrl}`)}
                  alt="상품이미지"
                  className={styles.pdImg}
                ></img>
              </div>
              <div className={styles.infoBox}>
                {token ? <LikeButton like={like} onClick={toggleLike} /> : null}
                <p className={styles.category}>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    홈
                  </Link>{' '}
                  &gt; {course.pdCategory}
                </p>
                <h1 className={styles.pdTitle}>{course.pdTitle}</h1>
                <p>
                  <span className={styles.price}>
                    {course.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                  원
                </p>
                <div className={styles.plusInfo}>
                  <div className={styles.info1}>
                    <li className={styles.title}>배송비</li>
                    <li className={styles.subTitle}>배송비 별도</li>
                  </div>
                  <div className={styles.option}>
                    <p>중고나라 거래 혜택</p>
                    <p>결제 네이버페이 결제 시 즉시할인 외 4건 &gt;</p>
                    <p>무이자 1만원 이상 무이자 할부 &gt;</p>
                  </div>
                  <div className={styles.subForm}>
                    <Button className={styles.chatBtn}>
                      <button onClick={() => handleChatt()}>채팅하기</button>
                    </Button>
                    <Button className={styles.buyBtn}>
                      <button>안전거래</button>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {course && (
          <div className={styles.content}>
            <div className={styles.pdDetail}>
              <h1>상품 내용</h1>
              <Caution className={styles.caution} />
              <p>{course.pdContents}</p>
            </div>
            <div className={styles.userInfo}></div>
          </div>
        )}

        <div
          className={
            chattingBox
              ? `${styles.chatSection} ${styles.active}`
              : styles.chatSection
          }
        >
          <div className={`${styles.chat} ${styles.chatHead}`}>
            <button className={styles.chat}>뒤로가기</button>
            <div>
              <button className={styles.chat}>이름</button>
              <p className={styles.chat}>보통 10분 내 응답</p>
            </div>
            <button className={styles.chat}>더보기</button>
          </div>
          <div className={`${styles.chat} ${styles.chatBody}`}>
            <div className={`${styles.chat} ${styles.chatfirst}`}>
              <h2 className={styles.chat}>
                중고나라 채팅, 중고나라 페이가 가장 안전합니다!
              </h2>
              <button className={styles.chat}>중고나라 페이 이용방법</button>
            </div>
          </div>
          <div className={`${styles.chat} ${styles.chatting}`}>
            <form className={`${styles.chat} ${styles.chattingForm}`}>
              <input
                className={styles.chat}
                type="textarea"
                placeholder="[상품정보 보내기] 안녕하세요. [게이밍 컴퓨터 3080] 보고 문의드립니다."
              />
            </form>
            <div className={`${styles.chat} ${styles.chattingBtn}`}>
              <button className={styles.chat}>사진</button>
              <button className={styles.chat}>보내기</button>
            </div>
          </div>
        </div>
        {toast && (
          <ToastPopup setToast={setToast} text="관심 상품이 추가되었습니다." />
        )}
      </Container>
    </div>
  );
}
