import { useState } from 'react';

export default function MyProductList({ product }) {
  const [state, setState] = useState(false);
  return (
    <div className="relative">
      {!state ? (
        // 판매 상품
        <>
          <a
            className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
            title="test"
            href={`/product/${product.product_id}`}
          >
            <div className="relative w-full rounded-md overflow-hidden pt-[100%] mb-3 md:mb-3.5">
              <img
                alt="test"
                referrerPolicy="no-referrer"
                src={require(`../../assets${product.imgUrl}`)}
                decoding="async"
                data-nimg="fill"
                className="bg-gray-300 object-cover w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none"
                loading="lazy"
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  inset: '0px',
                  color: 'transparent',
                }}
              ></img>
            </div>
            <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
              <h2 className="line-clamp-2 text-sm md:text-base text-heading">
                {product.pdTitle}
              </h2>
              <div className="font-semibold space-s-2 mt-0.5 text-heading lg:text-lg lg:mt-1.5">
                {product.price}원
              </div>
              <div className="my-1">
                <span className="text-sm text-gray-400"></span>
                <span className="text-sm text-gray-400 mx-1 hidden">|</span>
                <span className="text-sm text-gray-400"></span>
              </div>
              <div className="flex items-center"></div>
            </div>
          </a>
          <svg
            onClick={() => setState(true)}
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="absolute w-6 h-6 cursor-pointer right-2 bottom-8"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </>
      ) : (
        // 상품 더보기
        <div className="border-[2px] border-jnblack w-full h-full rounded-md p-8">
          <div className="flex flex-col justify-center w-full h-full">
            <div className="relative">
              <h2 className="text-center text-jnblack text-[18px] mb-4 font-semibold">
                더 보기
              </h2>
              <button
                onClick={() => setState(false)}
                className="absolute right-0 top-2"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="w-5 h-5 -mt-1"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                </svg>
              </button>
              <ul className="[&amp;>li]:py-3 [&amp;>li]:cursor-pointer text-jnblack pt-5">
                <li>상품수정</li>
                <li>상태변경</li>
                <li>상품삭제</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
