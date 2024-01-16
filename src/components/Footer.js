import Container from './Container';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <Container>
      <div className={styles.fBox}>
        <ul className={styles.links}>
          <li className={styles.title}>
            <h4>중고 나라</h4>
          </li>
          <li>(주)중고나라</li>
          <li>대표자 : 대표자</li>
          <li>사업자 등록 번호 : ***-**-****</li>
          <li>통신판매신고번호 : 제****-서울**-****호</li>
        </ul>
        <ul className={styles.sns}>
          <li>
            <h4 className={styles.subTitle}>Social</h4>
          </li>
          <li>
            <span className={styles.subLists}>페이스북</span>
          </li>
          <li>
            <span className={styles.subLists}>트위터</span>
          </li>
          <li>
            <span className={styles.subLists}>인스타</span>
          </li>
        </ul>
        <ul>
          <div className={styles.info}>
            <li className={styles.subTitle}>Information</li>
            <li>
              <span className={styles.subLists}>개인정보처리방침</span>
            </li>
            <li>
              <span className={styles.subLists}>이용약관</span>
            </li>
            <li>
              <span className={styles.subLists}>분쟁처리절차</span>
            </li>
            <li>
              <span className={styles.subLists}>청소년보호정책</span>
            </li>
            <li>
              <span className={styles.subLists}>사업자정보확인</span>
            </li>
            <li>
              <span className={styles.subLists}>게시글 수집 및 이용 안내</span>
            </li>
            <li>
              <span className={styles.subLists}>중고나라 고객센터</span>
            </li>
          </div>
        </ul>
        <ul>
          <div className={styles.contact}>
            <li className={styles.subTitle}>Contact</li>
            <li>
              <span className={styles.subLists}>
                메일 : joonggo@joonggo.co.kr
              </span>
            </li>
            <li>
              <span className={styles.subLists}>전화 : ***-****-****</span>
            </li>
            <li>
              <span className={styles.subLists}>주소 : 경기도</span>
            </li>
            <li>
              <span className={styles.subLists}>중고나라 광고 문의</span>
            </li>
            <li>
              <span className={styles.subLists}>중고나라 파트너스</span>
            </li>
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
