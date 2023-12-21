/* eslint-disable no-useless-catch */
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Container from '../components/Container';
import Button from '../components/Button';
import Caution from '../components/Caution';
import LikeButton from '../components/LikeButton';

export default function ProductDetail() {
  const { pdTitle } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);

  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

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

  useEffect(() => {
    productLists();
  }, []);

  useEffect(() => {
    if (!list) return;
    const foundCourse = list.find((e) => e.pdTitle === pdTitle);
    setCourse(foundCourse);
  }, [list, pdTitle]);

  return (
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
              <LikeButton like={like} onClick={toggleLike} />
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
                <Button className={styles.chatBtn}>채팅하기</Button>
                <Button className={styles.buyBtn}>안전거래</Button>
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
    </Container>
  );
}
