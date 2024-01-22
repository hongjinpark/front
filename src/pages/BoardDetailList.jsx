import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Board.module.css';

export default function BoardDetailList({
  list,
  boardImageDtoList,
  userInfoDtoList,
  regionDtoList,
}) {
  return (
    <>
      <article className={styles.content}>
        <div className="items-start block grid-cols-2 pt-5 lg:grid gap-x-10 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-2">
          <div className="px-3 sticky top-[200px]">
            <div className="carouselWrapper relative product-gallery swiperThumbnail product-gallery-slider">
              <div className="max-w-[1080px] lg:min-h-[550px] mx-auto max-w-[1080px] px-4 md:px-8 2xl:px-16 box-content">
                <div
                  className="slider slick-initialized slick-slider slick-dotted"
                  data-article-id="706251914"
                >
                  <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className="banner"
                    spaceBetween={50}
                  >
                    {boardImageDtoList.map((board, index) => (
                      <SwiperSlide key={index}>
                        <img src={require(`../assets${board.imgUrl}`)} alt="" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
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
                            src={require(`../assets${userInfo.imgUrl}`)}
                          />
                        </div>
                      ))}
                      <div className={styles.aa5}>
                        {userInfoDtoList.map((userInfo, index) => (
                          <div key={index} className={styles.aa6}>
                            <div className={styles.w7pzr95}>
                              {userInfo.usrNickName}
                            </div>
                          </div>
                        ))}

                        {regionDtoList.map((region, index) => (
                          <div key={index} className={styles.aa6}>
                            <div className={styles.w7pzr94}>
                              {region.regionName}
                            </div>
                          </div>
                        ))}
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
        <div className={styles.aa7}></div>
      </article>
    </>
  );
}
