import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Card from '../components/ItemCard';

const Home = () => {
  /*const { setAuth } = useContext(AuthContext);*/
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    /*setAuth({});*/
    navigate('/linkpage');
  };

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
        <div className={styles.flexGrow}>
          <button onClick={logout}>Sign Out</button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
