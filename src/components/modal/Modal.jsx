import { useContext, useEffect, useState } from 'react';
import styles from './modal.module.css';
export default function Modal({
  ModalContext,
  title,
  headerContent,
  bodyContent,
  setApiObject,
  apiMethod,
}) {
  const { isOpen, closeModal } = useContext(ModalContext);
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(isOpen);
      apiMethod().then((res) => {
        setApiObject(res.data);
      });
    } else {
      setModalVisible(false);
    }
  }, [isOpen, apiMethod, setApiObject]);

  if (!isOpen) {
    return null;
  }
  const handleButtonClose = () => {
    setModalVisible(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };
  const handleClose = (e) => {
    const modal = document.getElementById('modal');
    const target = e.target;
    if (target === modal || modal.contains(target)) {
      return;
    }
    setModalVisible(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };
  return (
    <div
      onClick={(e) => handleClose(e)}
      role="presentation"
      className={`${
        styles.modal
      } justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none bg-neutral-800/70 
      ${modalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-100'}`}
    >
      <div className="relative  w-full md:w-[600px] h-full lg:h-auto z-50">
        <div
          className="flex flex-col sm:h-screen sm:max-h-screen h-full max-h-full overflow-auto bg-white mx-auto my-0 pb-5"
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
                    onClick={() => handleButtonClose()}
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
          <div className="flex flex-col flex-1 w-full h-full overflow-y-scroll pt-0">
            {headerContent}
            <div>{bodyContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
