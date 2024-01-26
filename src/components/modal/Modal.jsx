import { useContext, useEffect, useState } from 'react';
import styles from './modal.module.css';

export default function Modal({
  ModalContext,
  title,
  headerContent,
  bodyContent,
  alterContent,
  popupContent,
  backButton,
}) {
  const { isOpen, closeModal } = useContext(ModalContext);
  const [modalVisible, setModalVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setModalVisible(isOpen);
      document.body.style.overflow = 'hidden';
    } else {
      setModalVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }
  const handleClose = (e) => {
    const modal = document.getElementById('modal');
    const target = e.target;
    if (target === modal || modal.contains(target)) {
      return;
    }
    setModalVisible(false);
    setTimeout(() => {
      closeModal();
      document.body.style.overflow = 'unset';
    }, 300);
  };
  return (
    <>
      <div
        onClick={(e) => handleClose(e)}
        role="presentation"
        className={`${
          styles.modal
        } justify-end items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none bg-neutral-800/70 
      ${modalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-100'}`}
      >
        <div
          className="relative  w-full md:w-[600px] h-full lg:h-auto z-50"
          id="modal"
        >
          <div className="flex flex-col sm:h-screen sm:max-h-screen h-full max-h-full overflow-auto bg-white mx-auto my-0">
            <header className="sticky z-[99] top-0">
              <div className="static">
                <div className="relative flex justify-between items-center w-full h-11 z-[9] px-5 py-[11px]">
                  <h1 className="text-xl font-semibold leading-[25px] w-full absolute -translate-y-2/4 overflow-hidden text-ellipsis whitespace-nowrap text-center left-0 top-[22px]">
                    {title}
                  </h1>
                  <div className="w-9 h-8 flex justify-center items-center text-left z-[1]">
                    {backButton}
                  </div>
                </div>
              </div>
            </header>
            <div className="flex flex-col flex-1 w-full h-full overflow-y-hidden pt-0">
              {headerContent}
              {bodyContent}
            </div>
          </div>
        </div>
      </div>
      {/* alter */}
      {alterContent}
      {popupContent}
    </>
  );
}
