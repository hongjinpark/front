import { useState, useContext, useEffect } from 'react';
import useAuth from './../../hooks/useAuth';
import ChatModalContext from '../../context/ChatModalProvider';
import { getChatRoomList } from './../../api/chat.api';
import { detailDate } from './../../utils/util';
export default function ChatRoom({ setChatRoom, setTitle }) {
  const { auth } = useAuth();
  const { isOpen, setIsOpen, setStep } = useContext(ChatModalContext);
  const [chatRoomList, setChatRoomList] = useState([]);
  useEffect(() => {
    setTitle('채팅');
    if (auth)
      getChatRoomList()
        .then((result) => {
          setChatRoomList(result.data);
        })
        .catch(() => {
          setIsOpen(false);
        });
  }, [auth, isOpen, setIsOpen, setTitle]);
  const findNickName = (chat) => {
    return auth?.id === chat.buyUser.id
      ? chat.buyUser.userInfo
        ? chat.sellUser.userInfo.usrNickName
        : chat.sellUser.nickname
      : chat.buyUser.userInfo
        ? chat.buyUser.userInfo.usrNickName
        : chat.buyUser.nickname;
  };
  //   const backButton = () => {
  //     return (
  //       <button
  //         onClick={() => setChatRoom()}
  //         className="w-full h-full font-normal text-base text-[rgb(20,19,19)] flex justify-center items-center"
  //         name="뒤로가기"
  //       >
  //         <svg
  //           width="30"
  //           height="30"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="h-auto rotate-0"
  //         >
  //           <path
  //             d="M12.5 19.5L4.42491 12.3749C4.19932 12.1759 4.19932 11.8241 4.42491 11.6251L12.5 4.5"
  //             stroke="currentColor"
  //             strokeWidth="1.5"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           ></path>
  //         </svg>
  //       </button>
  //     );
  //   };

  //   const header = () => {
  //     return (
  //       <div className="border-t-2 px-4 min-h-[70px] basis-[70px] flex justify-between items-center">
  //         <a
  //           className="flex flex-grow h-10 gap-4"
  //           href={`/${chatRoom?.product.product_id}`}
  //         >
  //           <div className="relative w-10 h-10 aspect-square">
  //             <img
  //               alt="상품 썸네일"
  //               src={ chatRoom require(`../../assets${chatRoom?.product.imgUrl}`)} // 상품 이미지
  //               decoding="async"
  //               data-nimg="fill"
  //               className="rounded-md h-full w-full"
  //               loading="lazy"
  //             />
  //           </div>
  //           <div>
  //             <div className="flex items-center">
  //               <span className="font-semibold text-[15px]">
  //                 {formattedNumber(chatRoom?.product.price)}
  //               </span>
  //             </div>
  //             <span className="block text-[12px]">
  //               {chatRoom?.product.pdTitle}
  //             </span>
  //           </div>
  //         </a>
  //       </div>
  //     );
  //   };
  const body = () => {
    return (
      <div className="h-full">
        {/* chat room */}
        <ul className="flex flex-col h-full overflow-auto bg-white overscroll-contain">
          {chatRoomList.map((chatroom) => (
            <li
              key={chatroom.chatRoomId}
              className="flex justify-between px-4 gap-5 w-full cursor-pointer bg-white"
              onClick={() => {
                setChatRoom(chatroom);
                setStep('chat');
              }}
              role="presentation"
            >
              <div className="flex py-3 border-t-[1px] border-gray-200 w-[90%]">
                <div className="border border-gray-100 relative flex flex-shrink-0 items-center justify-center bg-gray-300 rounded-full overflow-hidden">
                  <img
                    alt="프로필"
                    // src="profile.png"
                    src={
                      chatroom
                        ? auth
                          ? auth.id === chatroom?.buyUser.id
                            ? chatroom?.sellUser.userInfo
                              ? 'http://3.34.99.253:8000/public' +
                                `/assets${chatroom?.sellUser.userInfo.imgUrl}`
                              : 'profile.png'
                            : chatroom.buyUser.userInfo
                              ? 'http://3.34.99.253:8000/public' +
                                `/assets${chatroom?.buyUser.userInfo.imgUrl}`
                              : 'profile.png'
                          : null
                        : null
                    }
                    decoding="async"
                    data-nimg="1"
                    className="rounded-full h-[75px] object-cover w-[75px]"
                    loading="lazy"
                  />
                </div>
                <div className="flex w-[calc(100%-56px)] flex-col justify-around ml-4">
                  <div className="flex gap-2">
                    <div className="flex gap-2">
                      <h4 className="font-semibold text-base">
                        {findNickName(chatroom)}
                      </h4>
                    </div>
                    <p className="text-base mt-[2px]">
                      {detailDate(chatroom?.chatMessage.sendTime)}
                    </p>
                  </div>
                  <span className="text-base text-ellipsis overflow-hidden whitespace-nowrap min-[1024px]:max-w-[300px]">
                    {chatroom?.chatMessage.message}
                  </span>
                </div>
              </div>
              <div className="my-auto"></div>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return <>{body()}</>;
}
