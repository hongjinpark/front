/* eslint-disable no-useless-catch */
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container';
import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
  const { pdCategory } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);
  const [categories, SetCategories] = useState(null);
  const navigate = useNavigate();
  let nowState = '';

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

  const handleReset = (e) => {
    e.preventDefault();
    SetCategories('');
    navigate('/search/');
  };

  useEffect(() => {
    if (!pdCategory) return;
    SetCategories(pdCategory);
    productLists();
  }, [pdCategory]);

  useEffect(() => {
    productLists();
  }, [pdCategory]);

  useEffect(() => {
    if (!list && !pdCategory) return;
    const foundCourse = list.find((e) => e.pdCategory === categories);
    setCourse(foundCourse);
  }, [list, categories]);

  if (!pdCategory) {
    let min,
      max,
      avg = 0;
    if (list.length > 0) {
      min = max = avg = Number(list[0].price);
      list.forEach((e) => {
        (avg += Number(e.price)) &&
          (max = Math.max(max, Number(e.price))) &&
          (min = Math.min(min, Number(e.price)));
      });
    }
    avg = avg / Number(list.length);

    avg = avg ? avg.toLocaleString() : 'N/A';
    max = max ? max.toLocaleString() : 'N/A';
    min = min ? min.toLocaleString() : 'N/A';

    return (
      <Container>
        <div className={styles.search}>
          <div className={styles.container}>
            {/* left box */}
            <div className={styles.filter}>
              <div className={styles.filterTitle}>
                <p>필터</p>
                <button onClick={handleReset}>초기화</button>
              </div>
              <div className={styles.filterList}>
                <p className={styles.fSubTitle}>카테고리</p>
                <ul>
                  {list.map((e) => {
                    return (
                      <Link to={`${e.pdCategory}`} key={e.product_id}>
                        <li key={e.product_id} className={styles.fList}>
                          {e.pdCategory}
                        </li>
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
                  <Link to="/">홈</Link> &gt;{' '}
                </span>
                <span>검색</span>
              </p>
              <div className={styles.productTitle}>
                <h1>검색 결과 </h1>
                <p className={styles.result}>&nbsp; {list.length} 개의 상품</p>
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
                    평균{' '}
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
                <Products list={list} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  } else {
    // 카테고리 있음
    if (!course) {
      return;
    } else {
      const sell = course.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return (
        <Container>
          <div className={styles.search}>
            <div className={styles.container}>
              {/* left box */}
              <div className={styles.filter}>
                <div className={styles.filterTitle}>
                  <p>필터</p>
                  <button onClick={handleReset}>초기화</button>
                </div>
                <div className={styles.filterList}>
                  <p className={styles.fSubTitle}>카테고리</p>
                  <ul>
                    {list.map((e) => {
                      if (e.pdCategory === pdCategory) nowState = true;
                      else nowState = false;
                      return (
                        <Link to={`${e.pdCategory}`} key={e.product_id}>
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
                    <Link to="/">홈</Link> &gt; <Link to="../Search">검색</Link>{' '}
                    &gt;{' '}
                  </span>{' '}
                  <span>{course.pdCategory}</span>
                </p>
                <div className={styles.productTitle}>
                  <h1>검색 결과</h1>
                  <p className={styles.result}>
                    {course
                      ? `${
                          list.filter((e) => e.pdCategory === course.pdCategory)
                            .length
                        } 개의 상품`
                      : `${list.length} 개의 상품`}
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
                    평균 가격이에요. <br />
                    평균 <span>{sell}</span>원
                  </div>
                  <div className={styles.pBox}>
                    가장 높은 가격이에요. <br />
                    최고 <span>{sell}</span> 원
                  </div>
                  <div className={styles.pBox}>
                    가장 낮은 가격이에요. <br />
                    최저 <span>{sell}</span> 원
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
  }
}
