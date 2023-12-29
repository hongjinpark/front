/* eslint-disable no-useless-catch */
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useEffect, useRef, useState } from 'react';
import { getApi } from '../api/axios';
import Container from '../components/Container';
import Button from '../components/Button';
import Caution from '../components/Caution';
import LikeButton from '../components/LikeButton';
import axios from 'axios';

export default function ProductDetail() {
  const { pdTitle } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem('login');
  const [chattingBox, setChattingBox] = useState(false);

  const chattingArea = useRef(null);

  console.log('chattingArea : ', chattingArea);

  if (chattingArea) {
    console.log('활성화되어있음');
  }

  //관심물품
  const [like, setLike] = useState(false);
  const toggleLike = () => {
    setLike(!like);
  };

  const likeData = async () => {
    if (token) {
      const res = await axios.get('http://localhost:8090/attention/lists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // const pdList = await axios.get('http://localhost:8090/product/list');
      // const pdId = pdList.filter(i => i.product_);
      console.log(res);
      // console.log(pdId);
      console.log();
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
    console.log('채팅 선택');
    setChattingBox(true);
  };

  useEffect(() => {
    productLists();
    likeData();
  }, []);

  useEffect(() => {
    if (!list) return;
    const foundCourse = list.find((e) => e.pdTitle === pdTitle);
    setCourse(foundCourse);
  }, [list, pdTitle]);

  return (
    <div
      onClick={() => {
        if (chattingBox === true) setChattingBox(false);
        console.log('채팅 제외 선택');
      }}
      role="presentation"
    >
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
                  <Link to="/">홈</Link> &gt; {course.pdCategory}
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
                  <div className={styles.info2}>
                    <li className={styles.title}>중고나라 페이</li>
                    <li className={styles.subTitle}>미사용</li>
                  </div>
                  <div className={styles.info3}>
                    <li className={styles.title}>제품 상태</li>
                    <li className={styles.subTitle}>새상품</li>
                  </div>
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
          ref={chattingArea}
          value={true}
          className={
            chattingBox
              ? `${styles.chatSection} ${styles.active}`
              : styles.chatSection
          }
        >
          <div className={styles.chatHead}>
            <button>뒤로가기</button>
            <div>
              <button>이름</button>
              <p>보통 10분 내 응답</p>
            </div>
            <button>더보기</button>
          </div>
          <div className={styles.chatBody}>
            <div className={styles.chatfirst}>
              <h2>중고나라 채팅, 중고나라 페이가 가장 안전합니다!</h2>
              <button>중고나라 페이 이용방법</button>
            </div>
          </div>
          <div className={styles.chatting}>
            <form className={styles.chattingForm}>
              <input
                type="textarea"
                placeholder="[상품정보 보내기] 안녕하세요. [게이밍 컴퓨터 3080] 보고 문의드립니다."
              />
            </form>
            <div className={styles.chattingBtn}>
              <button>사진</button>
              <button>보내기</button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
