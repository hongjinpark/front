import styles from './Products.module.css';
import Card from '../components/ItemCard';

export default function Products({ list }) {
  return (
    <ul className={styles.products}>
      {list.map((item) => {
        console.log('item : ' + JSON.stringify(item));
        return (
          <li key={item.userId}>
            <Card className={styles.card}>
              <div className={styles.info}>
                <p>상품명 : {item.pdTitle}</p>
                <p>가격 : {item.price}</p>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
