import styles from './Products.module.css';
import Card from '../components/ItemCard';
import { Link, useLocation, useParams } from 'react-router-dom';

export default function Products({ list }) {
  const { searchWord } = useParams();
  let newSearchWord = '';

  let location = useLocation().pathname;
  if (location === '/') {
    location = true;
  } else if (location === '/search/') {
    location = false;
  }

  if (!searchWord) {
    newSearchWord = searchWord;
  } else if (searchWord.includes('keyword')) {
    newSearchWord = searchWord.replace('keyword=', '');
  }

  if (!list || list.length === 0) {
    return (
      <div className={styles.poductResult}>
        <h1 className={styles.noProduct}>상품 검색 결과가 없습니다.</h1>
      </div>
    );
  } else if (Array.isArray(list)) {
    return (
      <ul className={styles.products}>
        {list.map((item) => {
          const price = Number(item.price).toLocaleString();
          return (
            <li key={item.product_id}>
              {newSearchWord ? (
                <>
                  <Link
                    to={`../../${item.product_id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
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
                        {/*  */}
                        {(item.pdStatus === 'C' || item.pdStatus === 'R') && (
                          <div className="absolute top-0 left-0 flex items-end w-[285px] h-[285px] bg-black bg-opacity-50">
                            <div
                              className={`w-full p-2 text-center text-white ${
                                item.pdStatus === 'C' && 'bg-black'
                              } ${
                                item.pdStatus === 'R' && 'bg-green-400'
                              } bg-opacity-50`}
                            >
                              {item.pdStatus === 'C' ? '판매완료' : '예약중'}
                            </div>
                          </div>
                        )}
                        {/*  */}
                        <div className={styles.info}>
                          <p>{item.pdTitle}</p>
                          <p>{price}원</p>
                        </div>
                      </Card>
                    </div>
                  </Link>
                </>
              ) : (
                <Link
                  to={`../../${item.product_id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
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
                      {(item.pdStatus === 'C' || item.pdStatus === 'R') && (
                        <div className="absolute top-0 left-0 flex items-end w-[285px] h-[285px] bg-black bg-opacity-50">
                          <div
                            className={`w-full p-2 text-center text-white ${
                              item.pdStatus === 'C' && 'bg-black'
                            } ${
                              item.pdStatus === 'R' && 'bg-green-400'
                            } bg-opacity-50`}
                          >
                            {item.pdStatus === 'C' ? '판매완료' : '예약중'}
                          </div>
                        </div>
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
          {newSearchWord ? (
            <Link
              to={`../../${list.product_id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
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
            <Link
              to={`../../${list.product_id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
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
          )}
        </li>
      </ul>
    );
  }
}
