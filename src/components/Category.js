/* eslint-disable no-useless-catch */
import styles from './Category.module.css';
import classNames from 'classnames';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';

export default function Category({ className }) {
  const [list, setList] = useState([]);

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

  // 중복 카테고리 제거
  const newCategory = [...new Set(list.map((e) => e.pdCategory))];

  return (
    <div className={classNames(styles.category, className)}>
      <div className={styles.categoryBox}>
        <button className={(styles.btn, styles.cBtn)}>
          <FontAwesomeIcon icon={faBars} />
          <span className={styles.text}>카테고리</span>
        </button>
        <div className={styles.categories}>
          <ul>
            {newCategory.map((e, value) => {
              console.log('e : ', e);
              return (
                <Link
                  to={`search/${e}`}
                  key={value}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className={styles.link}>{e}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <button className={classNames(styles.btn, styles.eBtn)}>이벤트</button>
      <button className={classNames(styles.btn, styles.sBtn)}>사기조회</button>
      <button className={classNames(styles.btn, styles.iBtn)}>출석체크</button>
    </div>
  );
}
