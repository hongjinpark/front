import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import styles from './LikeButton.module.css';

// import styles from './LikeButton.module.css';

export default function LikeButton({ like, onClick }) {
  return (
    <div role="presentation" className={styles.icons}>
      {like ? (
        <HeartFilled
          className={`${styles.button} ${styles.red}`}
          onClick={onClick}
        />
      ) : (
        <HeartOutlined className={styles.button} onClick={onClick} />
      )}
    </div>
  );
}
