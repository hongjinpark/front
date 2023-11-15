import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <Link to="/">
          <h2>중고 나라 사이트</h2>
        </Link>
        <ul className={styles.menu}>
          <li>
            <Link to="/editor" className={styles.link}>
              Go to the Editor page
            </Link>
          </li>
          <li>
            <Link to="/admin">Go to the Admin page</Link>
          </li>
          <li>
            <Link to="/lounge">Go to the Lounge</Link>
          </li>
          <li>
            <Link to="/linkpage">Go to the link page</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
