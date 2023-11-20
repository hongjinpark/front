import styles from './Products.module.css';
import Card from '../components/ItemCard';
import { Link } from 'react-router-dom';

export default function Products({ list }) {
  return (
    <ul className={styles.products}>
      {list.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`${item.pdCategory}`}>
              <Card className={styles.card}>
                <img
                  src={`data:image/jpeg;base64,${item.images[0].data}`}
                  alt="상품이미지"
                  className={styles.img}
                />
                <div className={styles.info}>
                  <p>상품명 : {item.pdTitle}</p>
                  <p>가격 : {item.price}</p>
                </div>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
