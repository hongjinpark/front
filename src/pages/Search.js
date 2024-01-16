/* eslint-disable no-useless-catch */
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';
import Pagination from './Pagination';

export default function Search() {
  const [list, setList] = useState([]);
  const [topic, setTopic] = useState([]);
  const [order, setOrder] = useState('price');
  const [btnClick, setBtnClick] = useState('recommend');
  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const newList = list.sort((a, b) => a[order] - b[order]);

  const handlerecommenBtn = () => {
    setOrder('price');
    setBtnClick('recommend');
  };
  const handleLeastBtn = () => {
    setOrder('rating');
    setBtnClick('least');
  };
  const handleLowerBtn = () => {
    setOrder('price');
    setBtnClick('lower');
  };
  const handleHighBtn = () => {
    setOrder('-price');
    setBtnClick('high');
  };

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

  const topicLists = async () => {
    let path = `/topics`;
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);
      setTopic(getData);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    productLists();
    topicLists();
    setLimit(20);
  }, [order]);

  let min,
    max,
    avg = 0;

  if (!list) return;
  if (list.length > 1) {
    min = max = avg = Number(list[0].price);
    list.forEach((e) => {
      (avg += Number(e.price)) &&
        (max = Math.max(max, Number(e.price))) &&
        (min = Math.min(min, Number(e.price)));
    });
    avg = avg / Number(list.length);

    avg = avg ? avg.toLocaleString() : 'N/A';
    max = max ? max.toLocaleString() : 'N/A';
    min = min ? min.toLocaleString() : 'N/A';
  } else {
    avg = avg / Number(list.length);

    avg = avg ? avg.toLocaleString() : 'N/A';
    max = max ? max.toLocaleString() : 'N/A';
    min = min ? min.toLocaleString() : 'N/A';
  }

  return (
    <Container className={styles.section}>
      <div className={styles.search}>
        <div className={styles.container}>
          {/* left box */}
          <div className={styles.filter}>
            <div className={styles.filterTitle}>
              <p>필터</p>
              <button>초기화</button>
            </div>
            <div className={styles.filterList}>
              <p className={styles.fSubTitle}>카테고리</p>
              <ul>
                {topic &&
                  topic.map((e, index) => {
                    let replaced_word = '';
                    let newTopicName = e.topic_name;
                    console.log('newTopicName : ', newTopicName);
                    if (e.topic_name.indexOf('/') != -1) {
                      replaced_word = e.topic_name.replace('/', '');
                    } else {
                      replaced_word = e.topic_name;
                    }

                    if (newTopicName.indexOf('/') != -1) {
                      newTopicName = newTopicName.replace('/', '');
                    }
                    return (
                      <Link
                        to={`${replaced_word}`}
                        key={index}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <li className={styles.fList}>{e.topic_name}</li>
                      </Link>
                    );
                  })}
              </ul>
            </div>
          </div>
          {/* right box */}
          <div className={styles.product}>
            <p className={styles.category}>
              <span>
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  홈
                </Link>{' '}
                &gt;
              </span>
              <span> 검색</span>
            </p>
            <div className={styles.productTitle}>
              <h1>검색 결과 </h1>
              <p className={styles.result2}>
                &nbsp; {newList && newList.length} 개의 상품
              </p>
              <div className={styles.buttonBox}>
                <button
                  onClick={handlerecommenBtn}
                  className={btnClick === 'recommend' ? styles.btnEmphasis : ''}
                >
                  추천순&nbsp;
                </button>
                <span className={styles.slash}>|</span>
                <button
                  onClick={handleLeastBtn}
                  className={btnClick === 'least' ? styles.btnEmphasis : ''}
                >
                  &nbsp;최신순&nbsp;
                </button>
                <span className={styles.slash}>|</span>
                <button
                  onClick={handleLowerBtn}
                  className={btnClick === 'lower' ? styles.btnEmphasis : ''}
                >
                  &nbsp;낮은가격순&nbsp;
                </button>
                <span className={styles.slash}>|</span>
                <button
                  onClick={handleHighBtn}
                  className={btnClick === 'high' ? styles.btnEmphasis : ''}
                >
                  &nbsp;높은가격순&nbsp;
                </button>
              </div>
            </div>
            <p className={styles.compare}>
              현재 페이지의 상품 가격을 비교해봤어요
            </p>
            <div className={styles.priceBox}>
              <div className={styles.pBox}>
                <span className={styles.avg}>
                  평균 가격이에요. <br />
                  <span className={`${styles.pPrice} ${styles.avg}`}>
                    {avg}
                  </span>
                  원
                </span>
              </div>
              <div className={styles.pBox}>
                가장 높은 가격이에요. <br />
                <span className={styles.max}>
                  최고 <span className={styles.pPrice}>{max}</span> 원
                </span>
              </div>
              <div className={styles.pBox}>
                가장 낮은 가격이에요. <br />
                <span className={styles.min}>
                  최저 <span className={styles.pPrice}>{min}</span> 원
                </span>
              </div>
            </div>
            <div className={styles.itemBox}>
              <Products list={newList.slice(offset, offset + limit)} />
            </div>
            <Pagination
              total={list.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
