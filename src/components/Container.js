import classNames from 'classnames';
import styles from './Container.module.css';

export default function Container({ className, children }) {
  return (
    <section className={classNames(styles.home, className)}>
      <div className={styles.container}>{children}</div>
    </section>
  );
}
