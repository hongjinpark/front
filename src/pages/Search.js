/* eslint-disable no-useless-catch */
import { useParams } from 'react-router-dom';
import Container from '../components/Container';
import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';

export default function Search() {
  const { pdCategory } = useParams();
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
    const foundCourse = list.find((e) => e.pdCategory === pdCategory);
    setCourse(foundCourse);
  }, [list, pdCategory]);

  if (!pdCategory) {
    return (
      <Container>
        <div className={styles.search}>
          <h1>검색 페이지</h1>
          <Products list={list} />
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className={styles.search}>
          <h1>검색 페이지</h1>
          <Products list={course} />
        </div>
      </Container>
    );
  }
}
