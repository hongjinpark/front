import styles from './Products.module.css';
import Card from '../components/ItemCard';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Products({ list }) {
  const { pdCategory } = useParams();
  let location = useLocation().pathname;
  if (location === '/') {
    location = true;
  } else if (location === '/search/') {
    location = false;
  }
  console.log('location : ', location);
  if (!list || list.length === 0) {
    return <h1>원하시는 상품이 없습니다.</h1>;
  } else if (Array.isArray(list)) {
    return (
      <ul className={styles.products}>
        {list.map((item) => {
          const price = Number(item.price).toLocaleString();
          return (
            <li key={item.product_id}>
              {pdCategory ? (
                <></>
              ) : (
                <Link to={`../../${item.pdTitle}`}>
                  <div>
                    <Card className={styles.card}>
                      {location ? (
                        <img
                          src={require(`../assets${item.imgUrl}`)}
                          alt="상품이미지"
                          className={styles.imgHome}
                        />
                      ) : (
                        <img
                          src={require(`../assets${item.imgUrl}`)}
                          alt="상품이미지"
                          className={styles.imgSearchList}
                        />
                      )}
                      <div className={styles.info}>
                        <p>{item.pdTitle}</p>
                        <p>{price}원</p>
                      </div>
                    </Card>
                  </div>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  } else {
    const price = Number(list.price).toLocaleString();
    return (
      <ul className={styles.products}>
        <li key={list.product_id}>
          {pdCategory ? (
            <Link to={`../../${list.pdTitle}`}>
              <div>
                <Card className={styles.card}>
                  <img
                    src={require(`../assets${list.imgUrl}`)}
                    alt="상품이미지"
                    className={styles.imgSearchList}
                  />
                  <div className={styles.info}>
                    <p>{list.pdTitle}</p>
                    <p>{price}원</p>
                  </div>
                </Card>
              </div>
            </Link>
          ) : (
            <></>
          )}
        </li>
      </ul>
    );
  }
}
