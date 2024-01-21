import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Board.module.css';

export default function BoardDetailList({ list, boardImageDtoList }) {
  return (
    <div className={styles.section}>
      <div className="max-w-[1280px] lg:min-h-[950px] mx-auto max-w-[1280px] px-4 md:px-8 2xl:px-16 box-content">
        <div className="items-start block grid-cols-2 pt-5 lg:grid gap-x-10 xl:gap-x-14 pb-14 lg:py-10 lg:pb-14 2xl:pb-20">
          <div className="px-3 sticky top-[200px]">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              {boardImageDtoList.map((board, index) => (
                <SwiperSlide key={index}>
                  <img src={require(`../assets${board.imgUrl}`)} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="pt-4 lg:pt-0">
            <div>{list.bdSubject}</div>
            <div>{list.bdContents}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
