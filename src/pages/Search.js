/* eslint-disable no-useless-catch */
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container';
import styles from './Search.module.css';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Products from '../components/Products';

export default function Search() {
  const { pdCategory } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);
  const [categories, SetCategories] = useState(null);
  const navigate = useNavigate();

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

    avg = String(avg)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    max = String(max)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    min = String(min)
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
                <ul>
                  {list.map((e) => {
                    return (
                      <Link to={`${e.pdCategory}`} key={e.product_id}>
                        <li key={e.product_id}>{e.pdCategory}</li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </div>
            {/* right box */}
            <div className={styles.product}>
              <p className={styles.category}>
                <Link to="/">홈</Link> &gt; 검색 {list.pdCategory}
              </p>
              <div className={styles.productTitle}>
                <h1>검색 결과 </h1>
                <p>&nbsp; {list.length} 개의 상품</p>
                <button>추천순</button>
              </div>
              <p>현재 페이지의 상품 가격을 비교해봤어요</p>
              <div className={styles.priceBox}>
                <div className={styles.pBox}>
                  평균 가격이에요. <br />
                  평균 <span>{avg}</span>원
                </div>
                <div className={styles.pBox}>
                  가장 높은 가격이에요. <br />
                  최고 <span>{max}</span> 원
                </div>
                <div className={styles.pBox}>
                  가장 낮은 가격이에요. <br />
                  최저 <span>{min}</span> 원
                </div>
              </div>

              <Products list={list} />
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
                  <ul>
                    {list.map((e) => {
                      return (
                        <Link to={`${e.pdCategory}`} key={e.product_id}>
                          <li>{e.pdCategory}</li>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/* right box */}
              <div className={styles.product}>
                <p className={styles.category}>
                  <Link to="/">홈</Link> &gt; 검색 &gt; {course.pdCategory}
                </p>
                <div className={styles.productTitle}>
                  <h1>검색 결과</h1>
                  <p>
                    {course
                      ? `${
                          list.filter((e) => e.pdCategory === course.pdCategory)
                            .length
                        } 개의 상품`
                      : `${list.length} 개의 상품`}
                  </p>
                  <button>추천순</button>
                </div>
                <p>현재 페이지의 상품 가격을 비교해봤어요</p>
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
                <Products list={course} />
              </div>
            </div>
          </div>
        </Container>
      );
    }
  }
}
