import { useContext, useState } from 'react';

export default function Modal({ ModalContext, title }) {
  const { isOpen, closeModal } = useContext(ModalContext);
  const [text, setText] = useState('');
  if (!isOpen) {
    return null;
  }
  const handleClose = (e) => {
    const modal = document.getElementById('modal');
    const target = e.target;
    if (target === modal || modal.contains(target)) {
      return;
    }
    closeModal();
  };
  return (
    <div
      onClick={(e) => handleClose(e)}
      role="presentation"
      className="justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none bg-neutral-800/70"
    >
      <div className="relative  w-fullmd:w-4/6lg:w-3/6xl:w-2/5my-6mx-auto h-full lg:h-automd:h-auto z-50">
        <div
          className="flex flex-col h-screen w-screen max-w-[600px] max-h-screen overflow-auto bg-white mx-auto my-0 pb-5;"
          id="modal"
        >
          <header className="sticky z-[99] top-0">
            <div className="static">
              <div className="relative flex justify-between items-center w-full h-11 z-[9] px-5 py-[11px]">
                <h1 className="text-xl font-semibold leading-[25px] w-full absolute -translate-y-2/4 overflow-hidden text-ellipsis whitespace-nowrap text-center left-0 top-[22px]">
                  {title}
                </h1>
                <div className="w-9 h-8 flex justify-center items-center text-left z-[1]">
                  <button
                    onClick={() => closeModal()}
                    className="w-full h-full font-normal text-base text-[rgb(20,19,19)] flex justify-center items-center"
                    name="뒤로가기"
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-auto rotate-0"
                    >
                      <path
                        d="M12.5 19.5L4.42491 12.3749C4.19932 12.1759 4.19932 11.8241 4.42491 11.6251L12.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
                {/* <div className={styles.css1ay3cpr}></div> */}
              </div>
            </div>
            {/* <div className={styles.css16zjptt}></div> */}
          </header>
          <div
            id="container"
            className="flex-1 w-full h-full overflow-y-scroll pt-0"
          >
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
            <div>
              <div className="text-center px-0 py-[250px]">
                <p>최근 {title}이 없습니다.</p>
                {/* <div className={styles.cssbekvk4}></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
