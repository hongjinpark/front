import Container from './Container';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <Container>
      <div className={styles.fBox}>
        <ul className={styles.links}>
          <li className={styles.title}>중고 나라</li>
          <li>개인정보 취급방침</li>
          <li>사용자 이용약관</li>
          <li>자주 묻는 질문</li>
        </ul>
        <ul className={styles.sns}>
          <li className={styles.subTitle}> Social</li>
          <li>페이스북</li>
          <li>트위터</li>
          <li>인스타</li>
        </ul>
        <ul>
          <div className={styles.info}>
            <li className={styles.subTitle}>Information</li>
            <li>개인정보처리방침</li>
            <li>이용약관</li>
            <li>분쟁처리절차 </li>
            <li>청소년보호정책 </li>
            <li>사업자정보확인</li>
            <li>게시글 수집 및 이용 안내 </li>
            <li>중고나라 고객센터</li>
          </div>
        </ul>
        <ul>
          <div className={styles.contact}>
            <li className={styles.subTitle}>Contact</li>
            <li>(주)중고 거래 사이트</li>
            <li>대표 | 대표자 </li>
            <li>개인정보보호책임자 | 대표자 </li>
            <li>대표 번호 | 대표 번호 </li>
            <li>사업자번호 | ***-**-****</li>
            <li>통신판매업 | 제****-서울**-****호 </li>
            <li>주소 | 주소 </li>
          </div>
        </ul>
      </div>
      {/* <div className={styles.bottom}>
          <p className={styles.bottomLine}></p>
          <p>copyRight</p>
          <button>scroll top</button>
        </div> */}
    </Container>
  );
}
