import ChatModalContext from '../../context/ChatModalProvider';
import Modal from './Modal';

export default function ChatModal() {
  const body = () => {
    return (
      <div className="h-full">
        {/* chat room */}
        <ul className="flex flex-col h-full overflow-auto bg-white overscroll-contain">
          {/* 1번째 */}
          <li className="flex justify-between px-4 gap-5 w-full cursor-pointer bg-white">
            <div className="flex py-3 border-t-[1px] border-gray-200 w-[90%]">
              <div className="border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
                <img
                  alt="프로필"
                  src="profile.png"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-full max-w-none h-[75px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex w-[calc(100%-56px)] flex-col justify-around ml-4">
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <h4 className="font-semibold text-base">중고나라</h4>
                  </div>
                  <p className="text-base mt-[2px]">11월 28일</p>
                </div>
                <span className="text-base text-ellipsis overflow-hidden whitespace-nowrap min-[1024px]:max-w-[300px]">
                  안녕하세요
                </span>
              </div>
            </div>
            <div className="my-auto"></div>
          </li>
          <div></div>
          {/* 2번째 */}
          <li className="flex justify-between px-4 gap-5 w-full cursor-pointer bg-white">
            <div className="flex py-3 border-t-[1px] border-gray-200 w-[90%]">
              <div className="border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
                <img
                  alt="프로필"
                  src="profile.png"
                  decoding="async"
                  data-nimg="1"
                  className="rounded-full max-w-none h-[75px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex w-[calc(100%-56px)] flex-col justify-around ml-4">
                <div className="flex gap-2">
                  <div className="flex gap-2">
                    <h4 className="font-semibold text-base">중고나라</h4>
                  </div>
                  <p className="text-base mt-[2px]">11월 28일</p>
                </div>
                <span className="text-base text-ellipsis overflow-hidden whitespace-nowrap min-[1024px]:max-w-[300px]">
                  안녕하세요
                </span>
              </div>
            </div>
            <div className="my-auto"></div>
          </li>
          <div></div>
        </ul>
      </div>
    );
  };
  return (
    <Modal
      ModalContext={ChatModalContext}
      title={'채팅'}
      bodyContent={body()}
    />
  );
}
