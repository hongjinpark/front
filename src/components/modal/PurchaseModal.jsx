import { useState } from 'react';
import PurchaseModalContext from '../../context/PurchaseModalProvider';
import Modal from './Modal';
import { getPurchaseHistory, deleteHistory } from './../../api/history.api';
import { formattedNumber } from './../../utils/util';
import styles from './modal.module.css';

export default function PurchaseModal() {
  const [text, setText] = useState('');
  const [purchase, setPurchase] = useState([]);
  const [alterVisible, setAlterVisible] = useState({ is: false, id: '' });
  const handleDelete = () => {
    console.log(alterVisible);
    deleteHistory(alterVisible.id).then(() => {
      getPurchaseHistory().then((res) => setPurchase(res.data));
      setAlterVisible({ is: false, id: '' });
    });
    console.log();
  };
  const handleGet = () => {
    getPurchaseHistory(text, 0).then((res) => setPurchase(res.data));
  };
  const headerContent = () => {
    return (
      <div className="flex px-3 py-2">
        <div className="flex-1 w-full h-14 relative text-base font-medium leading-5 text-[rgb(51,51,51)] px-[15px] py-2.5 rounded-md bg-[rgb(241,244,246)]">
          <button
            onClick={handleGet}
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGet();
              }
            }}
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
        {purchase.length > 0 ? (
          purchase.map((purchaseItem) => (
            <div className="p-6" key={purchaseItem.id}>
              <div className="flex items-center pb-3 border-b-gray-600 border-b">
                <div className="flex-1 flex items-center">
                  <span className="flex flex-1 items-center">
                    {purchaseItem.regTime}
                  </span>
                  <div className="border-l-gray-200"></div>
                  <span className="font-medium text-base text-gray-300"></span>
                </div>
                <div className="flex items-center">
                  <button
                    className="w-7 h-7 bg-none"
                    onClick={() =>
                      setAlterVisible({ is: true, id: purchaseItem.id })
                    }
                  >
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
              <h2 className="text-2xl p-3 text-left font-semibold">구매완료</h2>
              <a href="/product/pdid">
                <div className="flex bg-transparent">
                  <div className="w-20 h-20 inline-block pt-0 rounded relative overflow-hidden">
                    <img
                      className="top-1/2 left-1/2 w-full h-auto rounded-lg object-cover -translate-x-2/4 -translate-y-2/4 absolute"
                      src={require(`../../assets${purchaseItem.imgUrl}`)}
                      alt=""
                    />
                  </div>
                  <div className="h-20 flex flex-col flex-1 ml-5 items-start">
                    <p className="text-base font-normal overflow-hidden text-left mb-2">
                      {purchaseItem.pdTitle}
                    </p>
                    <strong className="text-lg font-semibold">
                      {formattedNumber(purchaseItem.price)}
                    </strong>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="text-center px-0 py-[250px]">
            <p>최근 구매 내역이 없습니다.</p>
          </div>
        )}
      </div>
    );
  };
  const alter = () => {
    return (
      <div
        className={`${
          styles.modal
        } justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none bg-neutral-800/70 
      ${
        alterVisible.is
          ? 'opacity-100 scale-100 w-full'
          : 'opacity-0 scale-100 z-30'
      }`}
      >
        <div
          className="relative w-full md:w-[600px] h-full lg:h-auto z-50"
          id="modal"
        >
          <div className="flex flex-col sm:h-screen sm:max-h-screen h-full max-h-full overflow-auto mx-auto my-0 pb-5">
            <div className="w-full h-full opacity-100 transition-all duration-300 ease-[ease-out] delay-[0s] flex">
              <div className="w-full overflow-hidden rounded-md bg-white max-w-md flex flex-col m-auto">
                <div className="w-full h-full text-center leading-normal pt-7 pb-6 px-5">
                  <p className="text-base leading-[22px] font-normal text-[rgb(20,19,19)]">
                    구매내역 삭제 시 조회 및 복구할 수 없습니다.
                  </p>
                  <p className="text-base leading-[22px] font-normal text-[rgb(20,19,19)]">
                    정말 삭제하시겠습니까?
                  </p>
                </div>
                <div className="flex w-full justify-between px-4 pb-4">
                  <button
                    onClick={() => setAlterVisible({ is: false, id: '' })}
                    className="inline-block w-full h-full min-h-[44px] text-[rgb(20,19,19)] text-center align-middle bg-white text-sm font-medium border rounded p-[13px] border-solid border-[rgb(194,198,206)]"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => handleDelete()}
                    className="inline-block w-full h-full min-h-[44px] text-center align-middle text-sm font-medium rounded text-white border bg-[rgb(20,19,19)] p-[13px] border-solid border-[rgb(20,19,19)]"
                  >
                    확인
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      ModalContext={PurchaseModalContext}
      title={'구매 내역'}
      headerContent={headerContent()}
      bodyContent={bodyContent()}
      setApiObject={setPurchase}
      apiMethod={getPurchaseHistory}
      alterContent={alter()}
    />
  );
}
