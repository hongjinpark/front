/* eslint-disable no-useless-catch */
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useContext, useEffect, useState } from 'react';
import { getApi } from '../api/axios';
import Container from '../components/Container';
import Button from '../components/Button';
import Caution from '../components/Caution';
import LikeButton from '../components/LikeButton';
import axios from 'axios';
import ChatModalContext from '../context/ChatModalProvider';
import ToastContext from '../context/ToastContext';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

export default function ProductDetail() {
  const { product_id } = useParams();
  const [list, setList] = useState([]);
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem('login');
  const { setIsOpen, setStep } = useContext(ChatModalContext);
  const toastContext = useContext(ToastContext);
  const [pdImg, setPdImg] = useState([]);
  const [user, setUser] = useState([]);
  const [userRegion, setUserRegion] = useState([]);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  //관심물품
  const [like, setLike] = useState(false);
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
      toastContext.setToastMessage(['관심 상품이 추가되었습니다']);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  useEffect(() => {
    likeData();
    productImgs();
    productLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productLists = async () => {
    let path = `/product/list`;
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);

      setList(getData);
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const productImgs = async () => {
    let path = `/product/detail/${product_id}`;
    try {
      const options = {
        path: path,
      };
      const getData = await getApi(options);
      setPdImg(getData.productImageDtoList);
      setUser(getData.userInfoDtoList);
      setUserRegion(getData.regionDtoList);
    } catch (e) {
      return null;
    }
  };

  const handleChatt = () => {
    if (!auth) {
      toastContext.setToastMessage(['로그인이 필요합니다']);
      navigate('../login');
    } else {
      setIsOpen(true);
      setStep('init');
    }
  };

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
        {loading ? <Loading /> : null}
        {course && (
          <>
            <div className={styles.pdInfo}>
              <div className={styles.imgBox}>
                <Swiper
                  pagination={true}
                  modules={[Pagination]}
                  spaceBetween={50}
                >
                  {pdImg.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <img
                          src={
                            process.env.PUBLIC_URL + `../assets${img.imgUrl}`
                          }
                          alt="상품이미지"
                          className={styles.pdImg}
                        ></img>
                        {(course.pdStatus === 'C' ||
                          course.pdStatus === 'R') && (
                          <div className={styles.pdStatus} key={index}>
                            <div
                              className={`${styles.pdStatusBg}  ${
                                course.pdStatus === 'C'
                              } ${course.pdStatus === 'R' && 'bg-green-400'} `}
                            >
                              {course.pdStatus === 'C' ? '판매완료' : '예약중'}
                            </div>
                          </div>
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
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
                <p className={styles.pdTitleprice}>
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
                  <div className={`${styles.info2} ${styles.option}`}>
                    <li className={styles.title}>중고나라 거래 혜택</li>
                    <li>결제 네이버페이 결제 시 즉시할인 외 4건 &gt;</li>
                    <li>무이자 1만원 이상 무이자 할부 &gt;</li>
                  </div>
                </div>
                <div className={styles.subForm}>
                  <Button
                    className={
                      course.user_id !== auth?.id && course.pdStatus === 'Y'
                        ? styles.chatBtn
                        : styles.chatBtndisabled
                    }
                  >
                    <button
                      className={styles.chatBtntext}
                      onClick={() => handleChatt()}
                    >
                      채팅하기
                    </button>
                  </Button>

                  {course.user_id !== auth?.id ? (
                    course.pdStatus === 'Y' ? (
                      <Button className={styles.buyBtn}>
                        <button className={styles.pdEditBtn}>안전거래</button>
                      </Button>
                    ) : (
                      <Button className={`${styles.buyBtn} ${styles.pdEdit}`}>
                        <button className={styles.pdEditBtn}>
                          거래불가상품
                        </button>
                      </Button>
                    )
                  ) : (
                    <Button className={`${styles.buyBtn} ${styles.pdEdit}`}>
                      <Link to="../mypage">
                        <button className={styles.pdEditBtn}>상품수정</button>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {course && (
          <div className={styles.contentArea}>
            <div className={`${styles.content} ${styles.pdInfoArea}`}>
              <div className={styles.pdDetail}>
                <h1>상품 내용</h1>
                <Caution className={styles.caution} />
                <p>{course.pdContents}</p>
              </div>
            </div>
            <div className={`${styles.content} ${styles.userInfo}`}>
              <div className={styles.pdDetail}>
                <h1>사용자 정보</h1>

                {user.length === 0 &&
                userRegion.length === 0 &&
                pdImg.length === 0 ? (
                  <h1>사용자 정보 없음</h1>
                ) : (
                  <div className={styles.userInfoArea}>
                    <span className={styles.userImg}>
                      <img
                        src={
                          process.env.PUBLIC_URL + `../assets${user[0].imgUrl}`
                        }
                        alt=""
                        className={styles.userImage}
                      ></img>
                    </span>
                    <span className={styles.userName}>
                      {user[0].usrNickName}
                    </span>
                    <span className={styles.userRegion}>
                      {userRegion[0].regionName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
