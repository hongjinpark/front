import styles from './ItemCard.module.css';

export default function Card({ className, children }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
