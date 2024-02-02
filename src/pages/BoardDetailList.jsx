import { Swiper, SwiperSlide } from 'swiper/react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Board.module.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ToastContext from '../context/ToastContext';
import useAuth from '../hooks/useAuth';
import axios from 'axios';

export default function BoardDetailList({
  params,
  list,
  boardImageDtoList,
  userInfoDtoList,
  regionDtoList,
}) {
  const navigator = useNavigate();
  const toastContext = useContext(ToastContext);
  const { auth } = useAuth();
  const token = localStorage.getItem('login');

  const Delete = () => {
    if (window.confirm('삭제하시겠습니까?')) {
      axios
        .delete('http://localhost:8090/board/lists/' + params, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toastContext.setToastMessage(['게시글이 삭제되었습니다.']);
          navigator('/board');
        });
    }
  };
  const Edit = () => {
    navigator('/board/update/' + params);
  };
  return (
    <>
      <div className={styles.section}>
        <div className="items-start block grid-cols-2 pt-5 lg:grid gap-x-7 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-2">
          <div className="carouselWrapper relative product-gallery swiperThumbnail product-gallery-slider">
            <div className="max-w-[1080px] lg:min-h-[550px] mx-auto max-w-[1080px] px-4 md:px-8 2xl:px-16 box-content">
              <div className="slider slick-initialized slick-slider slick-dotted">
                <Swiper
                  pagination={true}
                  modules={[Pagination]}
                  // className="banner"
                  className={styles.img_list}
                  spaceBetween={50}
                >
                  {boardImageDtoList.map((board, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className={styles.img}
                        src={process.env.PUBLIC_URL + `/assets${board.imgUrl}`}
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          <div className="pt-4 lg:pt-0">
            <section id="article-profile">
              <div className={styles.aa7}>
                <div className="pt-4 lg:pt-0">
                  <div className={styles.aa5}>
                    <div className={styles.aa2}>
                      {userInfoDtoList.map((userInfo, index) => (
                        <div key={index} className={styles.aa4}>
                          <img
                            className={styles.imageStyle}
                            alt=""
                            src={
                              process.env.PUBLIC_URL +
                              `/assets${userInfo.imgUrl}`
                            }
                          />
                        </div>
                      ))}
                      <div className={styles.aa5}>
                        {userInfoDtoList.map((userInfo, index) => (
                          <div key={index} className={styles.aa16}>
                            <div className={styles.w7pzr95}>
                              {userInfo.usrNickName}
                            </div>
                          </div>
                        ))}

                        {regionDtoList.map((region, index) => (
                          <div key={index} className={styles.aa16}>
                            <div className={styles.w7pzr94}>
                              {region.regionName}
                            </div>
                          </div>
                        ))}
                        {list.userId == auth?.id ? (
                          <div className={styles.edit}>
                            &nbsp;&nbsp;
                            <EditOutlined
                              onClick={Edit}
                              className={styles.btn_edit}
                            />
                            <DeleteOutlined
                              onClick={Delete}
                              className={styles.btn_edit}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className={`${styles.bdSubjects} ${styles.section}`}>
              {list.bdSubject}
            </div>
            <div className={styles.bdContents}>{list.bdContents}</div>
          </div>
        </div>
      </div>
      <div className={styles.aa7}></div>
    </>
  );
}
