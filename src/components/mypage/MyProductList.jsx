import { useState } from 'react';
import MyPageProductMore from './MyPageProductMore';
import { formattedNumber } from '../../utils/util';

export default function MyProductList({ product }) {
  const [state, setState] = useState(false);
  const [step, setStep] = useState('nomal');
  const handleClose = () => {
    setState(false);
    setStep('nomal');
  };
  return (
    <div className="relative">
      {!state ? (
        // 판매 상품
        <>
          <a
            className="group box-border overflow-hidden flex rounded-md cursor-pointer pe-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
            title="test"
            href={`/${product.product_id}`}
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
              {(product.pdStatus === 'C' || product.pdStatus === 'R') && (
                <div className="absolute top-0 left-0 flex items-end w-full h-full bg-black bg-opacity-50">
                  <div
                    className={`w-full p-2 text-center text-white ${
                      product.pdStatus === 'C' && 'bg-black'
                    } ${
                      product.pdStatus === 'R' && 'bg-green-400'
                    } bg-opacity-50`}
                  >
                    {product.pdStatus === 'C' ? '판매완료' : '예약중'}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
              <h2 className="line-clamp-2 text-sm md:text-base text-heading">
                {product.pdTitle}
              </h2>
              <div className="font-semibold space-s-2 mt-0.5 text-heading lg:text-lg lg:mt-1.5">
                {formattedNumber(product.price)}
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
        <MyPageProductMore
          product={product}
          step={step}
          setStep={setStep}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}
