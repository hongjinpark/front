import styles from './Button.module.css';
import classNames from 'classnames';

export default function Button({ className, children }) {
  return <div className={classNames(styles.button, className)}>{children}</div>;
}
