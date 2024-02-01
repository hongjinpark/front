/* eslint-disable no-useless-catch */
import styles from './Category.module.css';
import '../components/Font.css';
import classNames from 'classnames';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getApi } from '../api/axios';

export default function Category({ className }) {
  const [topic, setTopic] = useState([]);

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
    topicLists();
  }, []);

  return (
    <div className={classNames(styles.category, className)}>
      <div className={styles.categoryBox}>
        <button className={(styles.btn, styles.cBtn)}>
          <FontAwesomeIcon icon={faBars} />
          <span className={styles.text}>카테고리</span>
        </button>
        <div className={styles.categories}>
          <ul>
            {topic.map((e, value) => {
              let searchWord = '';
              if (e.topic_name.indexOf('/') != -1) {
                searchWord = e.topic_name.replace('/', '');
              } else {
                searchWord = e.topic_name;
              }

              return (
                <Link
                  to={`search/${searchWord}`}
                  key={value}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li className={styles.link}>{e.topic_name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
      <button className={classNames(styles.btn, styles.sBtn)}>
        <Link to="/board" style={{ textDecoration: 'none', color: 'inherit' }}>
          게시판
        </Link>
      </button>
      <button className={classNames(styles.btn, styles.iBtn)}>
        <Link to="/notice" style={{ textDecoration: 'none', color: 'inherit' }}>
          공지사항
        </Link>
      </button>
    </div>
  );
}
