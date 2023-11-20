/* eslint-disable no-useless-catch */
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';

export default function ProductDetail() {
  const { pdCategory } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);

  const productLists = async () => {
    let path = `/product/lists/all`;
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
    if (!list.content) return;
    const foundCourse = list.content.find((e) => e.pdCategory === pdCategory);
    setCourse(foundCourse);
  }, [list, pdCategory]);

  return (
    <div className={styles.container}>
      <h1>Product Detail Page</h1>
      {course && (
        <div className={styles.pdInfo}>
          <img
            src={`data:image/jpeg;base64,${course.images[0].data}`}
            alt="상품이미지"
            className={styles.img}
          />
          <h1>상품명 : {course.pdTitle}</h1>
          <h2>카테고리 : {course.pdCategory && '카테고리 없음'} </h2>
          <h2>가격 : {course.price}</h2>
        </div>
      )}
      {course && (
        <div className={styles.pdDetail}>
          <h1>상품 상세 정보</h1>
          <p>{course.pdContents}</p>
        </div>
      )}
    </div>
  );
}