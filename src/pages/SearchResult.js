/* eslint-disable no-useless-catch */
import styles from './Search.module.css';
import { Link, useParams } from 'react-router-dom';
import { getApi } from '../api/axios';
import { useEffect, useState } from 'react';
import Products from '../components/Products';
import Container from '../components/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

export default function SearchResult() {
  const { searchWord } = useParams();
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');
  let nowState = false;
  const [course, setCourse] = useState(null);
  // const [categories, SetCategories] = useState(null);

  console.log('searchWord : ', searchWord);

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
  }, []);

  useEffect(() => {
    if (searchWord.indexOf('keyword') != -1) {
      setKeyword(searchWord.replace('keyword=', ''));
    } else {
      setKeyword('');
    }
  }, [searchWord]);

  useEffect(() => {
    if (!list && !searchWord) return;

    if (!searchWord.indexOf('keyword')) {
      console.log('검색어 결과임');
      const newSearch = searchWord.replace('keyword=', '');
      const foundCourse = list.find((e) => e.pdTitle === newSearch);
      setCourse(foundCourse);
    } else {
      console.log('카테고리 결과임');
      const foundCourse = list.find((e) => e.pdCategory === searchWord);
      setCourse(foundCourse);
    }
  }, [list, searchWord]);

  const handleCategory = () => {
    setKeyword('');
  };

  let min,
    max,
    avg = 0;

  if (!list) return;
  console.log('course : ', course);
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
    <Container>
      <div className={styles.search}>
        <div className={styles.container}>
          {/* left box */}
          <div className={styles.filter}>
            <div className={styles.filterTitle}>
              <p>필터</p>
              <h1>검색 결과 화면</h1>
              <button>초기화</button>
            </div>
            <div className={styles.filterList}>
              <p className={styles.fSubTitle}>카테고리</p>
              <ul>
                {list &&
                  list.map((e) => {
                    if (e.pdCategory === searchWord) nowState = true;
                    else nowState = false;
                    return (
                      <Link
                        to={`../${e.pdCategory}`}
                        key={e.product_id}
                        onClick={handleCategory}
                      >
                        {nowState ? (
                          <li
                            className={`${styles.fList} ${styles.fListSelect}`}
                          >
                            {e.pdCategory}
                          </li>
                        ) : (
                          <li className={styles.fList}>{e.pdCategory}</li>
                        )}
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
                <Link to="/">홈</Link> &gt; 검색 &gt;{' '}
              </span>
              <span>{keyword ? keyword : searchWord}</span>
            </p>
            <div className={styles.productTitle}>
              <h1>검색 결과 </h1>
              <p className={styles.result}>
                &nbsp; {list && list.length} 개의 상품
              </p>
              <button className={styles.buttonFilter}>
                추천순
                <span className={styles.bIcon}>
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </button>
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
              <Products list={course} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
