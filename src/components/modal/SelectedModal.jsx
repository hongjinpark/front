import Modal from './Modal';
import { useContext, useEffect, useState } from 'react';
import { formattedNumber } from './../../utils/util';
import styles from './modal.module.css';
import SelectedModalContext from '../../context/SelectedModalProvider';
import {
  deleteSelectProduct,
  getSelectProduct,
} from './../../api/selectProduct.api';

export default function SelectedModal() {
  const { isOpen, setIsOpen } = useContext(SelectedModalContext);
  const [text, setText] = useState('');
  const [selectProduct, setSelectProduct] = useState([]);
  const [period, setPeriod] = useState();
  const [alterVisible, setAlterVisible] = useState({ is: false, id: '' });
  const [popupVisible, setPopupVisible] = useState(false);
  const periodData = [
    { key: '0', value: '최근 1년' },
    { key: '1', value: '1주일' },
    { key: '2', value: '1개월' },
    { key: '3', value: '3개월' },
    { key: '4', value: '6개월' },
  ];
  useEffect(() => {
    if (isOpen)
      getSelectProduct()
        .then((res) => setSelectProduct(res.data))
        .catch(() => setIsOpen(false));
  }, [isOpen]);

  const handleDelete = () => {
    deleteSelectProduct(alterVisible.id).then(() => {
      getSelectProduct(text, 0).then((res) => setSelectProduct(res.data));
      setAlterVisible({ is: false, id: '' });
    });
  };

  const handleGet = () => {
    getSelectProduct(text, period).then((res) => {
      setSelectProduct(res.data);
      setPopupVisible(false);
    });
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
          onClick={() => setPopupVisible(true)}
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
        {selectProduct.length > 0 ? (
          selectProduct.map((selectItem) => (
            <div className="p-6" key={selectItem.id}>
              <div className="flex items-center pb-3 border-b-gray-600 border-b">
                <div className="flex-1 flex items-center">
                  <span className="flex flex-1 items-center">
                    {selectItem.regTime.split('T')[0]}
                  </span>
                  <div className="border-l-gray-200"></div>
                  <span className="font-medium text-base text-gray-300"></span>
                </div>
                <div className="flex items-center">
                  <button
                    className="w-7 h-7 bg-none"
                    onClick={() =>
                      setAlterVisible({ is: true, id: selectItem.id })
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
              {/* <h2 className="text-2xl pt-4 pb-3 text-left font-semibold">sd</h2> */}
              <div className="text-2xl pt-4 pb-3 text-left font-semibold"></div>
              <a href={`/${selectItem.pdId}`}>
                <div className="flex bg-transparent">
                  <div className="w-20 h-20 inline-block pt-0 rounded relative overflow-hidden">
                    <img
                      className="top-1/2 left-1/2 w-full h-auto rounded-lg object-cover -translate-x-2/4 -translate-y-2/4 absolute min-h-full"
                      src={require(`../../assets${selectItem.imgUrl}`)}
                      alt=""
                    />
                  </div>
                  <div className="h-20 flex flex-col flex-1 ml-5 items-start">
                    <p className="text-base font-normal overflow-hidden text-left mb-2">
                      {selectItem.pdTitle}
                    </p>
                    <strong className="text-lg font-semibold">
                      {formattedNumber(selectItem.price)}
                    </strong>
                  </div>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="text-center px-0 py-[250px]">
            <p>최근 조회 내역이 없습니다.</p>
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
          ? 'opacity-100 scale-100 w-full z-40'
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
                    조회내역 삭제 시 조회 및 복구할 수 없습니다.
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
  const popup = () => {
    return (
      <div
        className={`${
          styles.modal
        } justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none bg-neutral-800/70 
      ${
        popupVisible
          ? 'opacity-100 scale-100 w-full z-40'
          : 'opacity-0 scale-100 z-30'
      }`}
      >
        <div
          className="relative w-full md:w-[600px] h-full lg:h-auto z-50 self-end"
          id="modal"
        >
          <div className="relative flex items-center w-screen md:max-w-[600px] max-h-screen">
            <div className="w-full">
              <div className="bg-white pt-3 pb-4 rounded-t-3xl">
                <header className="relative align-middle py-3 flex justify-center">
                  <h1 className="font-medium text-xl">상세필터</h1>
                  <button
                    type="button"
                    className="top-1/2 right-5 absolute w-6 h-6"
                    onClick={() => setPopupVisible(false)}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-auto"
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
                </header>
                <section className="mt-7 mb-8">
                  <h2 className="font-medium text-base mx-4 mb-3">조회기간</h2>
                  <div className="w-full mb-3">
                    <ul className="flex px-4 list-none ">
                      {periodData.map((data) => (
                        <li
                          className={`mr-2 rounded flex-1 border ${
                            period === data.key &&
                            'bg-[rgb(13,204,90)] text-white'
                          }`}
                          key={data.key}
                          onClick={() => {
                            console.log(data.value);
                            setPeriod(data.key);
                          }}
                          role="presentation"
                        >
                          <label
                            htmlFor="_최근 1년"
                            className="relative flex rounded justify-center h-12 items-center font-medium text-sm px-3"
                          >
                            <input
                              type="radio"
                              id={data.key}
                              name="period"
                              value={data.key}
                              className="hidden"
                            />
                            <p>{data.value}</p>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="font-normal text-base text-[rgb(156,163,175)] ml-6">
                    ▪︎ 최근 1년 이내의 거래내역만 노출됩니다
                  </p>
                </section>
                <div className="mx-6 bg-[rgb(20,19,19)] text-white rounded-lg">
                  <button
                    className="relative rounded flex justify-center w-full h-12 items-center"
                    onClick={() => handleGet()}
                  >
                    조회하기
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
      ModalContext={SelectedModalContext}
      title={'조회 내역'}
      headerContent={headerContent()}
      bodyContent={bodyContent()}
      alterContent={alter()}
      popupContent={popup()}
    />
  );
}
