/* eslint-disable no-useless-catch */
import styles from './Home.module.css';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';
import Container from '../components/Container';
import Pagination from './Pagination';

const Home = () => {
  const { auth } = useAuth();
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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
    setLimit(12);
  }, [auth]);

  return (
    <Container className={styles.container}>
      <div className={styles.box1}>
        <div className={styles.items}>
          <Products
            list={list.slice(offset, offset + limit)}
            className={styles.img}
          />
        </div>
        <Pagination
          total={list.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </Container>
  );
};

export default Home;
