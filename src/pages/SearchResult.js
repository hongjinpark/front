/* eslint-disable no-useless-catch */
import styles from './Search.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getApi } from '../api/axios';
import { useEffect, useState } from 'react';
import Products from '../components/Products';
import Container from '../components/Container';

export default function SearchResult() {
  const { searchWord } = useParams();
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState('');
  let nowState = false;
  const [btnClick, setBtnClick] = useState('recommen');
  const [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const [order, setOrder] = useState('price');

  const newList = list.sort((a, b) => a[order] - b[order]);
  const handlerecommenBtn = () => {
    setOrder('price');
    setBtnClick('recommen');
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

  useEffect(() => {
    productLists();
  }, [order, searchWord]);

  useEffect(() => {
    if (searchWord.includes('keyword') != -1) {
      setKeyword(searchWord.replace('keyword=', ''));
    } else {
      setKeyword('');
    }
  }, [searchWord]);

  useEffect(() => {
    if (!newList && !searchWord) return;

    if (!searchWord.indexOf('keyword')) {
      const newSearch = searchWord.replace('keyword=', '');
      const foundCourse = newList.filter((e) => e.pdTitle.includes(newSearch));
      setCourse(foundCourse);
    } else {
      const foundCourse = newList.find((e) => e.pdCategory === searchWord);
      setCourse(foundCourse);
    }
  }, [newList, searchWord]);

  const handleCategory = () => {
    setKeyword('');
    productLists();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setKeyword('');
    navigate('../');
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setKeyword('');
    navigate('../');
  };

  let min,
    max,
    avg = 0;

  if (!newList) return;
  if (newList.length > 1) {
    min = max = avg = Number(newList[0].price);
    newList.forEach((e) => {
      (avg += Number(e.price)) &&
        (max = Math.max(max, Number(e.price))) &&
        (min = Math.min(min, Number(e.price)));
    });
    avg = avg / Number(newList.length);

    avg = avg ? avg.toLocaleString() : 'N/A';
    max = max ? max.toLocaleString() : 'N/A';
    min = min ? min.toLocaleString() : 'N/A';
  } else {
    avg = avg / Number(newList.length);

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
              <button onClick={handleReset}>초기화</button>
            </div>
            <button onClick={handleDelete} className={styles.filterItem}>
              <span>{keyword ? keyword : ` `}</span>
              <span>X</span>
            </button>

            <div className={styles.filterList}>
              <p className={styles.fSubTitle}>카테고리</p>
              <ul>
                {newList &&
                  newList.map((e) => {
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
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  홈
                </Link>{' '}
                &gt; 검색 &gt;{' '}
              </span>
              <span>{keyword ? keyword : `' '`}</span>
            </p>
            <div className={styles.productTitle}>
              {searchWord.indexOf('keyword=') ? (
                <>
                  <h1>검색 결과</h1>
                  <p className={styles.result2}>
                    {Array.isArray(course) ? course.length : 1} 개의 상품
                  </p>
                </>
              ) : (
                <>
                  <p className={styles.result}>
                    <span className={styles.Emphasis}>
                      &lsquo;{keyword ? keyword : `' '`}&rsquo;
                    </span>{' '}
                    의 검색 결과 &nbsp;{' '}
                    {Array.isArray(course) ? course.length : 1} 개의 상품
                  </p>
                </>
              )}

              <div className={styles.buttonBox}>
                <button
                  onClick={handlerecommenBtn}
                  className={btnClick === 'recommen' ? styles.btnEmphasis : ''}
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
            {course && course?.length !== 0 ? (
              <>
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
              </>
            ) : (
              <></>
            )}

            <div className={styles.itemBox}>
              <Products list={course} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
