/* eslint-disable no-useless-catch */
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useContext, useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Container from '../components/Container';
import Button from '../components/Button';
import Caution from '../components/Caution';
import LikeButton from '../components/LikeButton';
import axios from 'axios';
import ToastPopup from '../components/ToastPopup';
import ChatModalContext from '../context/ChatModalProvider';
import useAuth from './../hooks/useAuth';

export default function ProductDetail() {
  const { product_id } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem('login');
  const { setIsOpen, setStep } = useContext(ChatModalContext);
  const { auth } = useAuth();
  //관심물품
  const [like, setLike] = useState(false);
  const [toast, setToast] = useState(false);
  const toggleLike = async () => {
    if (like == false) {
      axios.post(
        'http://localhost:8090/attention',
        {
          status: 'Y',
          productId: product_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setToast(true);
      setLike(true);
    } else {
      axios.post(
        'http://localhost:8090/attention',
        {
          status: 'N',
          productId: product_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLike(false);
    }
  };

  const likeData = async () => {
    if (token) {
      const att = await axios.get('http://localhost:8090/attention/lists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const attStatus =
        att.data.findIndex((i) => i.productId == product_id) != -1
          ? att.data[att.data.findIndex((i) => i.productId == product_id)]
              .status
          : null;
      if (attStatus == 'Y') {
        setLike(true);
      } else if (attStatus == 'N') {
        setLike(false);
      }
    }
  };
  //

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

  const handleChatt = () => {
    setIsOpen(true);
    setStep('init');
  };

  // const handleExceptioin = (e) => {
  //   let newclassName = e.target.className;
  //   //추후 수정여부 검토 필요
  //   if (newclassName.includes !== undefined) {
  //     if (newclassName.includes('ProductDetail_chat__V1pwk')) {
  //       setChattingBox(true);
  //     } else if (chattingBox === true) {
  //       setChattingBox(false);
  //     }
  //   }
  // };

  useEffect(() => {
    productLists();
    likeData();
  }, []);

  useEffect(() => {
    if (!list) return;
    const foundCourse = list.find(
      (e) => Number(e.product_id) == Number(product_id)
    );
    setCourse(foundCourse);
  }, [list, product_id]);

  return (
    <div role="presentation">
      <Container className={styles.container}>
        {course && (
          <>
            <div className={styles.pdInfo}>
              <div className={styles.imgBox}>
                <img
                  src={require(`../assets${course.imgUrl}`)}
                  alt="상품이미지"
                  className={styles.pdImg}
                ></img>
              </div>
              <div className={styles.infoBox}>
                {token ? <LikeButton like={like} onClick={toggleLike} /> : null}
                <p className={styles.category}>
                  <Link
                    to="/"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    홈
                  </Link>{' '}
                  &gt; {course.pdCategory}
                </p>
                <h1 className={styles.pdTitle}>{course.pdTitle}</h1>
                <p>
                  <span className={styles.price}>
                    {course.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                  원
                </p>
                <div className={styles.plusInfo}>
                  <div className={styles.info1}>
                    <li className={styles.title}>배송비</li>
                    <li className={styles.subTitle}>배송비 별도</li>
                  </div>
                  <div className={styles.option}>
                    <p>중고나라 거래 혜택</p>
                    <p>결제 네이버페이 결제 시 즉시할인 외 4건 &gt;</p>
                    <p>무이자 1만원 이상 무이자 할부 &gt;</p>
                  </div>
                  <div className={styles.subForm}>
                    {course.user_id !== auth?.id ? (
                      <>
                        <Button className={styles.chatBtn}>
                          <button onClick={() => handleChatt()}>
                            채팅하기
                          </button>
                        </Button>
                        <Button className={styles.buyBtn}>
                          <button>안전거래</button>
                        </Button>
                      </>
                    ) : (
                      // 내가 올린 상품
                      <>
                        <ul className="flex flex-row justify-around w-full">
                          <li>
                            <button className="flex flex-col items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 8.99995V13.9656C5 17.8505 7.91015 21 11.5 21C15.0899 21 18 17.8505 18 13.9656V5"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <rect
                                  x="4.25"
                                  y="4"
                                  width="1.5"
                                  height="1"
                                  rx="0.5"
                                  fill="#141313"
                                ></rect>
                                <rect
                                  x="4.25"
                                  y="6"
                                  width="1.5"
                                  height="1"
                                  rx="0.5"
                                  fill="#141313"
                                ></rect>
                                <path
                                  d="M15 7L18 4L21 7"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <p className="text-sm mt-[6px]">위로 올리기</p>
                            </button>
                          </li>
                          <li>
                            <button className="flex flex-col items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 21H21"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M7.91993 19.7931C8.05181 19.7601 8.17224 19.6919 8.26836 19.5958L19.9497 7.91448C20.2034 7.66076 20.4047 7.35954 20.542 7.02803C20.6793 6.69652 20.75 6.34121 20.75 5.98239C20.75 5.62357 20.6793 5.26826 20.542 4.93675C20.4047 4.60524 20.2034 4.30402 19.9497 4.0503C19.696 3.79657 19.3948 3.59531 19.0633 3.45799C18.7317 3.32068 18.3764 3.25 18.0176 3.25C17.2929 3.25 16.5979 3.53788 16.0855 4.0503L4.40418 15.7316C4.30806 15.8278 4.23987 15.9482 4.2069 16.0801L3.27239 19.8181C3.2085 20.0737 3.28338 20.344 3.46967 20.5303C3.65596 20.7166 3.92632 20.7915 4.1819 20.7276L7.91993 19.7931Z"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <p className="text-sm mt-[6px]">상품수정</p>
                            </button>
                          </li>
                          <li>
                            <button className="flex flex-col items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M16 9L10.5 14.5L8 12"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <p className="text-sm mt-[6px]">상태변경</p>
                            </button>
                          </li>
                          <li>
                            <button className="flex flex-col items-center">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 6H5H21"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M10 11V17"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M14 11V17"
                                  stroke="#141313"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              <p className="text-sm mt-[6px]">상품삭제</p>
                            </button>
                          </li>
                        </ul>
                      </>
                    )}
                    {/* <Button className={styles.chatBtn}>
                      <button onClick={() => handleChatt()}>채팅하기</button>
                    </Button>
                    <Button className={styles.buyBtn}>
                      <button>안전거래</button>
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {course && (
          <div className={styles.content}>
            <div className={styles.pdDetail}>
              <h1>상품 내용</h1>
              <Caution className={styles.caution} />
              <p>{course.pdContents}</p>
            </div>
            <div className={styles.userInfo}></div>
          </div>
        )}

        {/* <div
          className={
            chattingBox
              ? `${styles.chatSection} ${styles.active}`
              : styles.chatSection
          }
        >
          <div className={`${styles.chat} ${styles.chatHead}`}>
            <button className={styles.chat}>뒤로가기</button>
            <div>
              <button className={styles.chat}>이름</button>
              <p className={styles.chat}>보통 10분 내 응답</p>
            </div>
            <button className={styles.chat}>더보기</button>
          </div>
          <div className={`${styles.chat} ${styles.chatBody}`}>
            <div className={`${styles.chat} ${styles.chatfirst}`}>
              <h2 className={styles.chat}>
                중고나라 채팅, 중고나라 페이가 가장 안전합니다!
              </h2>
              <button className={styles.chat}>중고나라 페이 이용방법</button>
            </div>
          </div>
          <div className={`${styles.chat} ${styles.chatting}`}>
            <form className={`${styles.chat} ${styles.chattingForm}`}>
              <input
                className={styles.chat}
                type="textarea"
                placeholder="[상품정보 보내기] 안녕하세요. [게이밍 컴퓨터 3080] 보고 문의드립니다."
              />
            </form>
            <div className={`${styles.chat} ${styles.chattingBtn}`}>
              <button className={styles.chat}>사진</button>
              <button className={styles.chat}>보내기</button>
            </div>
          </div>
        </div> */}
        {toast && (
          <ToastPopup setToast={setToast} text="관심 상품이 추가되었습니다." />
        )}
      </Container>
    </div>
  );
}
