import useAuth from './../hooks/useAuth';
import { useEffect, useState, React } from 'react';
import { getMyProductList } from '../api/product.api';
import MyProductList from '../components/mypage/MyProductList';
import MyPageProductHeader from '../components/mypage/MyPageProductHeader';
import MyPageMenu from '../components/mypage/MyPageMenu';
export default function MyPage() {
  const { auth } = useAuth();

  const [myProducts, setMyProducts] = useState([]);
  const [status, setStatus] = useState('A');

  const attributesData = [
    {
      name: '전체',
      value: 'A',
    },
    {
      name: '판매중',
      value: 'Y',
    },
    {
      name: '예약중',
      value: 'R',
    },
    {
      name: '판매완료',
      value: 'C',
    },
  ];
  useEffect(() => {
    getMyProductList().then((res) => {
      setMyProducts(res.data);
    });
  }, []);
  const handleSort = (sortedProduct) => {
    setMyProducts(sortedProduct);
  };
  return (
    <main className="relative flex-grow border-b-2">
      <div className="flex mx-auto max-w-[1600px] px-4 md:px-8 2xl:px-16 box-content">
        <MyPageMenu />
        {/* 유저정보 */}
        <div className="w-full flex-grow">
          <div className="block pb-4 lg:mt-6 ">
            <div className="lg:min-w-[800px] relative w-full h-full mb-4 col-span-2 text-black lg:flex lg:p-5 lg:border border-gray-300 rounded-lg">
              <div className="basis-1/2 flex flex-col justify-center mb-4 lg:mb-0 lg:pr-5 lg:border-r border-gray-300 lg:w-[50%]">
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-3 translate-x-3">
                    <img
                      className="rounded-full w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] box-content border-4 border-white mr-3"
                      alt="profile"
                      src="profile.png"
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
            <MyPageProductHeader
              myProducts={myProducts}
              setMyProducts={setMyProducts}
              handleSort={handleSort}
              attributesData={attributesData}
              setStatus={setStatus}
              status={status}
            />
            {/* 판매 상품  */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ">
              {myProducts.map(
                (product) =>
                  (status === 'A' || product.pdStatus === status) && (
                    <div key={product.product_id}>
                      <MyProductList product={product} />
                    </div>
                  )
              )}
            </div>
            {myProducts.filter(
              (product) => product.pdStatus === status || status === 'A'
            ).length === 0 && (
              <p className="py-12 text-center">
                선택된 조건에 해당하는 상품이 없습니다.
              </p>
            )}
            <div className="py-8 text-center xl:pt-14"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
