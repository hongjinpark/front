import { useContext, useEffect, useRef, useState } from 'react';
import ChatModalContext from '../../context/ChatModalProvider';
import Modal from './Modal';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import AuthContext from '../../context/AuthProvider';

export default function ChatModal() {
  const [chatRoom, setChatRoom] = useState();
  const [messages, setMessages] = useState([]);
  const stomp = useRef(null);
  const { auth } = useContext(AuthContext);
  const [text, setText] = useState('');

  useEffect(() => {
    setMessages([]);
    if (chatRoom) {
      const socket = new SockJS('http://localhost:8090/ws');
      stomp.current = Stomp.over(socket);

      stomp.current.connect({ Authorization: `Bearer ${auth.token}` }, () => {
        // 구독할 대상
        stomp.current.subscribe(`/sub/${chatRoom}`, (response) => {
          console.log(response);
          const newMessage = response.body;
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          console.log(messages);
        });
      });
    }
    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (stomp.current) {
        stomp.current.disconnect();
      }
    };
  }, [chatRoom]);
  const sendMessage = () => {
    // 메시지 전송
    if (text === '') return;
    stomp.current.send(`/room/${chatRoom}`, text);
    setText('');
  };

  const backButton = () => {
    return (
      <button
        onClick={() => setChatRoom()}
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
    );
  };
  const chatBody = () => {
    return (
      <>
        <div className="h-full overflow-auto">
          <div className="p-5 h-full bg-[#e9edef] overflow-auto">
            <div></div>
            <div>
              <span className="block text-center text-[14px] py-4">
                2024년 1월 5일
              </span>
              {/* 나 */}
              <div>
                <div type="textMessage">
                  <div className="flex items-end w-auto mb-2 flex-start space-x-1 flex-row-reverse space-x-reverse">
                    <div className="p-3 rounded-xl h-auto rounded-tr bg-[#363C45] text-white w-auto">
                      <p className="break-all whitespace-pre-wrap">text1</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="block text-[13px] uppercase text-end">
                        오후 5:56
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 상대 */}
              <div>
                <div type="textMessage">
                  <div className="flex items-end w-auto mb-2 flex-start space-x-1">
                    <div className="p-3 rounded-xl h-auto rounded-tl bg-white w-auto">
                      <p className="break-all whitespace-pre-wrap">text2</p>
                    </div>
                    <div className="flex flex-col">
                      <span className="block text-[13px] uppercase text-start">
                        오후 5:56
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              {messages.map((message, index) => (
                <div key={index}>
                  <div type="textMessage">
                    <div className="flex items-end w-auto mb-2 flex-start space-x-1">
                      <div className="p-3 rounded-xl h-auto rounded-tl bg-white w-auto">
                        <p className="break-all whitespace-pre-wrap">
                          {message}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <span className="block text-[13px] uppercase text-start">
                          오후 5:56
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 텍스트창 */}
        <div className="bg-[#e9edef] py-4 border-t-[2px] border-t-slate-300 px-3">
          {/* <form className="bg-[#F7F9FA] py-3 px-3 flex flex-col rounded-xl focus-within:shadow-banner h-auto"> */}
          <textarea
            title="채팅"
            autoComplete="off"
            maxLength="1000"
            className="shrink-0 bg-transparent placeholder:text-[#9CA3AF] outline-none resize-none text-md h-16 w-full pre-wrap"
            placeholder="메시지를 입력해주세요"
            name="chat"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
          <div className="flex justify-between mt-3">
            <div className="flex">
              <div>
                <div className="block">
                  <label
                    className="text-gray-600 font-semibold text-sm leading-none cursor-pointer block border-[#e1e1e1] text-center border-0 m-0 p-0 w-6 h-6"
                    htmlFor="chat-image-upload"
                  >
                    <img
                      src="file-upload.png"
                      name="image-upload"
                      id="image-upload"
                      alt="img"
                    />
                  </label>
                  <input
                    id="chat-image-upload"
                    name="chat-image-upload"
                    type="file"
                    className="hidden px-4 md:px-5 appearance-none border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-gray-100 border-gray-300 focus:shadow focus:bg-white focus:border-primary a11yHidden w-auto py-0 rounded-md"
                    autoComplete="off"
                    spellCheck="false"
                    aria-invalid="false"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple=""
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className="text-sm leading-5 text-gray-400">0 / 1000</span>
              <button
                type="submit"
                disabled=""
                className="w-6 h-6"
                onClick={sendMessage}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-full h-full fill-[#9CA3AF]"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 256C8 119 119 8 256 8s248 111 248 248-111 248-248 248S8 393 8 256zm143.6 28.9l72.4-75.5V392c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V209.4l72.4 75.5c9.3 9.7 24.8 9.9 34.3.4l10.9-11c9.4-9.4 9.4-24.6 0-33.9L273 107.7c-9.4-9.4-24.6-9.4-33.9 0L106.3 240.4c-9.4 9.4-9.4 24.6 0 33.9l10.9 11c9.6 9.5 25.1 9.3 34.4-.4z"></path>
                </svg>
              </button>
            </div>
          </div>
          {/* </form> */}
        </div>
      </>
    );
  };
  const header = () => {
    return (
      <div className="border-t-2 px-4 min-h-[70px] basis-[70px] flex justify-between items-center">
        <a className="flex flex-grow h-10 gap-4" href="/product/143349249">
          <div className="relative w-10 h-10 aspect-square">
            <img
              alt="상품 썸네일"
              src="favicon.ico" // 상품 이미지
              decoding="async"
              data-nimg="fill"
              className="rounded-md"
              loading="lazy"
              // style="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-[15px]">product_price</span>
            </div>
            <span className="block text-[12px]">product_Title</span>
          </div>
        </a>
      </div>
    );
  };
  const body = () => {
    return (
      <div className="h-full">
        {/* chat room */}
        <ul className="flex flex-col h-full overflow-auto bg-white overscroll-contain">
          {/* 1번째 */}
          <li
            className="flex justify-between px-4 gap-5 w-full cursor-pointer bg-white"
            onClick={() => setChatRoom(1)}
            role="presentation"
          >
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
          <li
            className="flex justify-between px-4 gap-5 w-full cursor-pointer bg-white"
            onClick={() => setChatRoom(2)}
            role="presentation"
          >
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
      title={chatRoom ? 'userName' : '채팅'}
      bodyContent={chatRoom ? chatBody() : body()}
      headerContent={chatRoom ? header() : null}
      backButton={backButton()}
    />
  );
}
