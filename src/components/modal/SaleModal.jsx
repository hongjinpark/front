import { getSaletHistory } from '../../api/history.api';
import SaleModalContext from '../../context/SaleModalProvider';
import Modal from './Modal';
import { useState } from 'react';
export default function SaleModal() {
  const [text, setText] = useState('');
  const [sale, setSale] = useState([]);
  const headerContent = () => {
    return (
      <div className="flex px-3 py-2">
        <div className="flex-1 w-full h-14 relative text-base font-medium leading-5 text-[rgb(51,51,51)] px-[15px] py-2.5 rounded-md bg-[rgb(241,244,246)]">
          <button
            type="submit"
            className="flex items-center justify-center h-11 absolute appearance-none ml-[15px] rounded-none border-[none] left-0 inset-y-0"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-auto rotate-0 text-[rgb(155,155,155)]"
            >
              <path
                stroke="currentColor"
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                stroke="currentColor"
                d="M21 21L17 17"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <input
            className="bg-inherit w-11/12 ml-[30px] h-full mr-[30px] focus:outline-none"
            type="search"
            id="searchWord"
            placeholder="상품명을 입력해주세요."
            autoComplete="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center h-14 border rounded text-[rgb(51,51,51)] text-center text-base leading-5 font-medium ml-2 px-4 py-2.5 border-solid border-[rgb(225,225,225)]"
        >
          <span className="pt-0.5">상세필터</span>
        </button>
      </div>
    );
  };
  const bodyContent = () => {
    return (
      <div>
        {sale.length > 0 ? (
          sale.map((saleItem) => (
            <div className="p-6" key={saleItem.id}>
              <div className="flex items-center pb-3 border-b-gray-600 border-b">
                <div className="flex-1 flex items-center">
                  <span className="flex flex-1 items-center">
                    {saleItem.regTime}
                  </span>
                  <div className="border-l-gray-200"></div>
                  <span className="font-medium text-base text-gray-300"></span>
                </div>
                <div className="flex items-center">
                  <button className="w-7 h-7 bg-none">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-auto"
                    >
                      <path
                        d="M20 4L4 20"
                        stroke="currentColor"
                        strokeWidth="1.52"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M4 4L20 20"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <h2 className="text-2xl p-3 text-left font-semibold">판매완료</h2>
              <a href="/product/pdid">
                <div className="flex bg-transparent">
                  <div className="w-20 h-20 inline-block pt-0 rounded relative overflow-hidden">
                    <img
                      className="top-1/2 left-1/2 w-full h-auto rounded-lg object-cover -translate-x-2/4 -translate-y-2/4 absolute"
                      src={require(`../../assets${saleItem.imgUrl}`)}
                      alt=""
                    />
                  </div>
                  <div className="h-20 flex flex-col flex-1 ml-5 items-start">
                    <p className="text-base font-normal overflow-hidden text-left mb-2">
                      {saleItem.pdTitle}
                    </p>
                    <strong className="text-lg font-semibold">
                      {saleItem.price}
                    </strong>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="text-center px-0 py-[250px]">
            <p>최근 판매 내역이 없습니다.</p>
          </div>
        )}
      </div>
    );
  };
  return (
    <Modal
      ModalContext={SaleModalContext}
      title={'판매 내역'}
      headerContent={headerContent()}
      bodyContent={bodyContent()}
      setApiObject={setSale}
      apiMethod={getSaletHistory}
    />
  );
}
