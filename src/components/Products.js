import styles from './Products.module.css';
import Card from '../components/ItemCard';
import { Link } from 'react-router-dom';

export default function Products({ list }) {
  if (!list || list.length === 0) {
    return <h1>원하시는 상품이 없습니다.</h1>;
  } else if (Array.isArray(list)) {
    return (
      <ul className={styles.products}>
        {list.map((item) => {
          return (
            <li key={item.product_id}>
              <Link to={`${item.pdTitle}`}>
                <div>
                  <Card className={styles.card}>
                    <img
                      src={require(`../assets${item.imgUrl}`)}
                      alt="상품이미지"
                      className={styles.img}
                    />
                    <div className={styles.info}>
                      <p>상품명 : {item.pdTitle}</p>
                      <p>가격 : {item.price}</p>
                    </div>
                  </Card>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <ul className={styles.products}>
        <li key={list.product_id}>
          <Link to={`${list.pdTitle}`}>
            <div>
              <Card className={styles.card}>
                <img
                  src={require(`../assets${list.imgUrl}`)}
                  alt="상품이미지"
                  className={styles.img}
                />
                <div className={styles.info}>
                  <p>상품명 : {list.pdTitle}</p>
                  <p>가격 : {list.price}</p>
                </div>
              </Card>
            </div>
          </Link>
        </li>
      </ul>
    );
  }
}
