/* eslint-disable no-useless-catch */
import styles from './Home.module.css';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';
import Container from '../components/Container';

const Home = () => {
  const { auth } = useAuth();
  const [list, setList] = useState([]);

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
  }, [auth]);

  return (
    <Container>
      <div className={styles.box1}>
        <div className={styles.items}>
          <Products list={list} className={styles.img} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
