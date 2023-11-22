/* eslint-disable no-useless-catch */
import styles from './Home.module.css';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';

const Home = () => {
  // const { setAuth } = useContext(AuthContext);
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
    <section>
      <div className={styles.container}>
        <div className={styles.box1}>
          <h1>중고 상품</h1>
          <div className={styles.items}>
            <Products list={list} />
          </div>
        </div>
        <div className={styles.box1}>
          <h1>중고 상품2</h1>
          <div className={styles.items}>
            <Products list={list} />
          </div>
        </div>
        <div className={styles.box1}>
          <h1>중고 상품3</h1>
          <div className={styles.items}>
            <Products list={list} />
          </div>
        </div>
        <div className={styles.box1}>
          <h1>중고 상품4</h1>
          <div className={styles.items}>
            <Products list={list} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
