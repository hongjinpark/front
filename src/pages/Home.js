import styles from './Home.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Card from '../components/ItemCard';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const Home = () => {
  // const { setAuth } = useContext(AuthContext);
  const { auth } = useAuth();

  useEffect(() => {
    // console.log(login);
  }, [auth]);

  return (
    <section>
      <Nav />
      <div className={styles.container}>
        <div className={styles.box1}>
          <h1>중고 상품</h1>
          <div className={styles.items}>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
          </div>
        </div>
        <div className={styles.box1}>
          <h1>중고 상품</h1>
          <div className={styles.items}>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
          </div>
        </div>
        <div className={styles.box1}>
          <h1>중고 상품</h1>
          <div className={styles.items}>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
          </div>
        </div>
        <div className={styles.box1}>
          <h1>중고 상품</h1>
          <div className={styles.items}>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
            <Card className={styles.card}>
              <div>
                <h2>상품명</h2>
                <p>가격</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
