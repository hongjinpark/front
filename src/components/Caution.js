import styles from './Caution.module.css';
import classNames from 'classnames';

export default function Caution({ className }) {
  return (
    <div className={classNames(className, styles.caution)}>
      <h1 className={styles.title}>거래 전 주의사항 안내 </h1>
      <div className={styles.content}>
        <p>
          판매자가 별도의 메신저로 결제링크를 보내거나 직거래(직접송금)을
          <br />
          유도하는 경우 사기일 가능성이 높으니 거래를 자제해 주시고 <br />
          <span className={styles.point}>
            <span className={styles.red}>중고로움 고객센터</span>로 신고해주시기
            바랍니다.
          </span>
        </p>
      </div>
    </div>
  );
}
