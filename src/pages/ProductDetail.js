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
import ChatModalContext from '../context/ChatModalProvider';
import ToastContext from '../context/ToastContext';
// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';
// import DeleteModalContext from '../context/DeleteModalProvider';
// import ChangeStatusModalContext from '../context/ChangeStatusModalProvider';

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
  /* 
  const navigate = useNavigate();
  const { openModal: openDeleteModal, setPdId: setDeletePdid } =
    useContext(DeleteModalContext);
  const {
    openModal: openChangeStatusModal,
    setPdId: setChangePdid,
    setPdStatus,
  } = useContext(ChangeStatusModalContext);
  */

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
      toastContext.setToastMessage(['관심 상품이 추가되었습니다.']);
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
      setLoading(false);
    } catch (e) {
      throw e;
    }
  };

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
      return;
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
    productImgs();
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
                          src={require(`../assets${img.imgUrl}`)}
                          alt="상품이미지"
                          className={styles.pdImg}
                        ></img>
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
                      course.user_id !== auth?.id
                        ? styles.chatBtn
                        : styles.chatBtndisabled
                    }
                  >
                    <button onClick={() => handleChatt()}>채팅하기</button>
                  </Button>

                  {course.user_id !== auth?.id ? (
                    <Button className={styles.buyBtn}>
                      {' '}
                      <button>안전거래</button>
                    </Button>
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
                        src={require(`../assets${user[0].imgUrl}`)}
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
