import { useState, useEffect, useContext, useRef } from 'react';
import axios from './../../api/axios';
import AuthContext from '../../context/AuthProvider';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import styles from '../../pages/Board.module.css';
import { format, isSameDay } from 'date-fns';
import { formattedNumber } from './../../utils/util';
import { ToastContext } from '../../context/ToastContext';
import ChatModalContext from '../../context/ChatModalProvider';

export default function ChatBody({ chatRoom, setTitle }) {
  const [text, setText] = useState();
  const { auth } = useContext(AuthContext);
  const token = localStorage.getItem('login');
  const { setIsOpen } = useContext(ChatModalContext);
  const [chatList, setChatList] = useState([]);
  const stomp = useRef(null);
  const toastContext = useContext(ToastContext);
  useEffect(() => {
    setChatList([]);
    if (chatRoom) {
      setTitle(
        auth?.id === chatRoom.buyUser.id
          ? chatRoom.buyUser.userInfo
            ? chatRoom.sellUser.userInfo.usrNickName
            : chatRoom.sellUser.nickname
          : chatRoom.buyUser.userInfo
            ? chatRoom.buyUser.userInfo.usrNickName
            : chatRoom.buyUser.nickname
      );
      const socket = new SockJS('http://3.34.99.253:8090/ws');
      stomp.current = Stomp.over(socket);
      axios
        .get(`http://3.34.99.253:8090/chat/${chatRoom.chatRoomId}`)
        .then((result) => {
          //   setChatList(result.data);
          setChatList(result.data);
        });
      stomp.current.connect({ Authorization: `Bearer ${auth.token}` }, () => {
        // 구독할 대상
        stomp.current.subscribe(`/sub/${chatRoom.chatRoomId}`, (response) => {
          const newMessage = JSON.parse(response.body);
          setChatList((prevMessages) => [...prevMessages, newMessage]);
        });
      });
    }
    return () => {
      // 컴포넌트 언마운트 시 연결 해제
      if (stomp.current) {
        stomp.current.disconnect();
      }
    };
  }, [auth?.id, auth.token, chatRoom, setTitle]);

  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];

    messages.forEach((message) => {
      const messageDate = new Date(message.sendTime);
      const dateIndex = groupedMessages.findIndex((group) =>
        isSameDay(new Date(group.date), messageDate)
      );

      if (dateIndex !== -1) {
        // 이미 있는 날짜 그룹에 추가
        groupedMessages[dateIndex].messages.push(message);
      } else {
        // 새로운 날짜 그룹 생성
        groupedMessages.push({
          date: format(messageDate, 'yyyy-MM-dd'),
          messages: [message],
        });
      }
    });
    return groupedMessages;
  };
  const groupedMessages = groupMessagesByDate(chatList);

  const sendMessage = () => {
    // 메시지 전송
    if (text === '') return;
    stomp.current.send(`/room/${chatRoom.chatRoomId}`, text);
    setText('');
  };

  const Delete = () => {
    if (window.confirm('채팅방을 나가시겠습니까?')) {
      axios
        .delete(`http://3.34.99.253:8090/chat/exit/${chatRoom.chatRoomId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toastContext.setToastMessage(['나가기 완료.']);
          setIsOpen(false);
        });
    }
  };

  const header = () => {
    return (
      <div className="border-t-2 px-4 min-h-[70px] basis-[70px] flex justify-between items-center">
        <a
          className="flex flex-grow h-10 gap-4"
          href={`/product/${chatRoom?.product.product_id}`}
        >
          <div className="relative w-10 h-10 aspect-square">
            <img
              alt="상품 썸네일"
              src={
                chatRoom &&
                'http://3.34.99.253:8000/public' +
                  `/assets${chatRoom?.product.imgUrl}`
              } // 상품 이미지
              decoding="async"
              data-nimg="fill"
              className="rounded-md h-full w-full"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-[15px]">
                {formattedNumber(chatRoom?.product.price)}
              </span>
            </div>
            <span className="block text-[12px]">
              {chatRoom?.product.pdTitle}
            </span>
          </div>
        </a>
        <li className={styles.w7pzr94}>
          <button onClick={Delete}>채팅방 나가기</button>
        </li>
      </div>
    );
  };
  function showChat() {
    return groupedMessages.map((group) => (
      <div key={group.date}>
        <span className="block text-center text-[14px] py-4">
          {format(new Date(group.date), 'yyyy년 MM월 dd일')}
        </span>
        {group.messages.map((list, index) => (
          <div key={index}>
            <div type="textMessage">
              <div
                className={`flex items-end w-auto mb-2 ${
                  list.userId === auth.id
                    ? 'flex-start space-x-1 flex-row-reverse space-x-reverse'
                    : 'flex-start space-x-1'
                }`}
              >
                <div
                  className={`p-3 rounded-xl h-auto ${
                    list.userId === auth.id
                      ? 'rounded-tr bg-[#363C45] text-white'
                      : 'rounded-tl bg-white'
                  } w-auto`}
                >
                  <p className="break-all whitespace-pre-wrap">
                    {list.message}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span
                    className={`block text-[13px] uppercase ${
                      list.userId === auth.id ? 'text-end' : 'text-start'
                    }`}
                  >
                    {format(new Date(list.sendTime), 'HH시 mm분')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
  }
  return (
    <>
      {header()}
      <div className="h-full overflow-auto">
        <div className="p-5 h-full bg-[#e9edef] overflow-auto">
          <div></div>
          <div>{showChat()}</div>
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
}
