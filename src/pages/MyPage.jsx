import useAuth from './../hooks/useAuth';
import PurchaseModalContext from '../context/PurchaseModalProvider';
import { useContext, useEffect, useState } from 'react';
import SaleModalContext from '../context/SaleModalProvider';
import { getMyProductList } from '../api/product.api';
import MyProductList from '../components/mypage/MyProductList';
export default function MyPage() {
  const { auth } = useAuth();
  const { openModal: openPurchaseModal } = useContext(PurchaseModalContext);
  const { openModal: openSaleModal } = useContext(SaleModalContext);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    getMyProductList().then((res) => setMyProducts(res.data));
  }, []);
  return (
    <main className="relative flex-grow border-b-2">
      <div className="flex mx-auto max-w-[1280px] px-4 md:px-8 2xl:px-16 box-content">
        <div className="hidden lg:block mt-6 min-w-[150px] basis-[300px] flex-shrink [&_ul]:mb-4 [&_li]:w-fit [&_li]:cursor-pointer [&_li]:mb-2 [&_li]:text-gray-600">
          <h2 className="mb-3 text-xl font-semibold">마이 페이지</h2>
          <h3 className="mb-2 text-lg font-semibold">쇼핑 정보</h3>
          <ul className="flex-col flex">
            <button onClick={() => openPurchaseModal()}>
              <li>구매내역</li>
            </button>
            <button onClick={() => openSaleModal()}>
              <li>판매내역</li>
            </button>
            <li>택배내역</li>
          </ul>
          <h3 className="mb-2 text-lg font-semibold">내 정보</h3>
          <ul>
            <li>계좌 관리</li>
            <li>배송지 관리</li>
            <li>이용 후기</li>
          </ul>
        </div>
        <div className="w-full flex-grow">
          <div className="block pb-4 lg:mt-6 ">
            <div className="lg:min-w-[800px] relative w-full h-full mb-4 col-span-2 text-black lg:flex lg:p-5 lg:border border-gray-300 rounded-lg">
              <div className="basis-1/2 flex flex-col justify-center mb-4 lg:mb-0 lg:pr-5 lg:border-r border-gray-300 lg:w-[50%]">
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-3 translate-x-3">
                    <image
                      alt="profile-image"
                      src="https://img2.joongna.com/common/Profile/Default/profile_m.png"
                    />
                    <h1 className="mr-2 text-xl font-semibold cursor-pointer lg:text-2xl">
                      {auth.nickname}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="relative w-full basis-1/2 lg:pl-5 lg:pt-3">
                <div className="flex justify-between mb-2 text-[#0CB650] font-medium">
                  <strong>신뢰지수 205</strong>
                  <span className="text-jnGray-500">1,000</span>
                </div>
                <div className="w-full h-1.5 bg-[#CCF4DC] rounded overflow-hidden">
                  <div
                    className="h-full rounded bg-[#0DCC5A]"
                    style={{ width: '20.5%' }}
                  ></div>
                </div>
                <ul className="flex justify-between mt-4 py-4 text-center text-jnGray-600 border border-gray-300 rounded-lg lg:border-none [&amp;_li]:w-full [&amp;_li]:border-r [&amp;_li]:border-gray-300">
                  <li>
                    <dt className="justify-center mt-0">안전거래</dt>
                    <dd className="text-xl font-semibold text-jnblack">0</dd>
                  </li>
                  <li className="cursor-pointer">
                    <dt className="justify-center mt-0">거래후기</dt>
                    <dd className="text-xl font-semibold underline text-jnblack">
                      0
                    </dd>
                  </li>
                  <li className="last:border-none">
                    <dt className="justify-center mt-0">단골</dt>
                    <dd className="text-xl font-semibold text-jnblack">0</dd>
                  </li>
                  <li className="last:border-none">
                    <dt className="max-[1169px]:justify-end min-[1170px]:justify-center items-center gap-1 mt-0">
                      <span>에코마일</span>
                      <span className="-translate-y-[1px]">
                        <div
                          className="inline-block border-none"
                          data-headlessui-state=""
                        >
                          <button
                            type="button"
                            aria-expanded="false"
                            data-headlessui-state=""
                            id="headlessui-popover-button-:r4a:"
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 24 24"
                              color="#C2C6CE"
                              className="inline-block text-center"
                              height="18"
                              width="18"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ color: 'rgb(194, 198, 206)' }}
                            >
                              <g>
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </span>
                    </dt>
                    <dd className="text-xl font-semibold text-jnblack">0 M</dd>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="px-0 max-lg:mt-10">
            {/* 상품 목록 헤더 */}
            <div className="items-center justify-between block mb-4 md:flex lg:mb-7">
              <div className="flex-shrink-0 mb-1 text-xs leading-4 text-body md:text-sm pe-4 md:me-6 lg:ps-2 lg:block">
                0 개의 상품
              </div>
              <div className="flex flex-wrap items-center justify-between">
                <div className="mr-0 lg:mr-4">
                  <ul className="colors flex flex-nowrap -me-3">
                    <li className="shrink-0 cursor-pointer rounded-full border border-gray-100  p-1 px-2 mr-1 sm:mr-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black">
                      전체
                    </li>
                    <li className="shrink-0 cursor-pointer rounded-full border border-gray-100  p-1 px-2 mr-1 sm:mr-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black">
                      판매중
                    </li>
                    <li className="shrink-0 cursor-pointer rounded-full border border-gray-100  p-1 px-2 mr-1 sm:mr-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black">
                      예약중
                    </li>
                    <li className="shrink-0 cursor-pointer rounded-full border border-gray-100  p-1 px-2 mr-1 sm:mr-3 flex justify-center items-center text-heading text-xs md:text-sm uppercase font-semibold transition duration-200 ease-in-out hover:border-black">
                      판매완료
                    </li>
                  </ul>
                </div>
                <div className="relative my-2 sm:m-0 lg:ms-0 z-10 min-w-[160px]">
                  <button
                    className="border border-gray-300 text-heading text-xs md:text-sm font-semibold relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer"
                    id="headlessui-listbox-button-:rg:"
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    data-headlessui-state=""
                  >
                    <span className="block truncate">최신순</span>
                    <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* 판매 상품  */}
            {myProducts.map((product) => (
              <MyProductList key={product.id} product={product} />
            ))}
            {/* <p className="py-12 text-center">
              선택된 조건에 해당하는 상품이 없습니다.
            </p> */}
          </div>
        </div>
      </div>
    </main>
  );
}
