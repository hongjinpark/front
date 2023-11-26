import SaleModalContext from '../../context/SaleModalProvider';
import Modal from './Modal';
import { useState } from 'react';
export default function SaleModal() {
  const [text, setText] = useState('');
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
      <div className="text-center px-0 py-[250px]">
        <p>최근 판매 내역이 없습니다.</p>
        {/* <div className={styles.cssbekvk4}></div> */}
      </div>
    );
  };
  return (
    <Modal
      ModalContext={SaleModalContext}
      title={'판매 내역'}
      headerContent={headerContent()}
      bodyContent={bodyContent()}
    />
  );
}
