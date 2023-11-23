/* eslint-disable no-useless-catch */
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Container from '../components/Container';

export default function ProductDetail() {
  const { pdTitle } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);

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

  if (!course) {
    return;
  } else {
    console.log('course : ' + JSON.stringify(course.imgUrl));
  }
  return (
    <Container>
      {course && (
        <div className={styles.pdInfo}>
          <div className={styles.imgBox}>
            <img
              src={require(`../assets${course.imgUrl}`)}
              alt="상품이미지"
              className={styles.img}
            />
          </div>
          <div className={styles.infoBox}>
            <h1 className={styles.pdTitle}>상품명 : {course.pdTitle}</h1>
            <p>
              <span className={styles.price}>
                {course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </span>
              원
            </p>
            <p>카테고리 : {course.pdCategory && '카테고리 없음'} </p>
          </div>
        </div>
      )}
      {course && (
        <div className={styles.pdDetail}>
          <h1>상품 상세 정보</h1>
          <p>{course.pdContents}</p>
        </div>
      )}
    </Container>
  );
}
