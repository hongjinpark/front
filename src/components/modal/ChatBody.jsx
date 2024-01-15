import { useState, useEffect, useContext, useRef } from 'react';
import axios from './../../api/axios';
import AuthContext from '../../context/AuthProvider';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default function ChatBody({ chatRoom }) {
  const [text, setText] = useState('');
  const { auth } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  const stomp = useRef(null);
  useEffect(() => {
    setMessages([]);
    if (chatRoom) {
      const socket = new SockJS('http://localhost:8090/ws');
      stomp.current = Stomp.over(socket);
      axios
        .get(`http://localhost:8090/chat/${chatRoom.chatRoomId}`)
        .then((result) => {
          setChatList(result.data);
          console.log(chatList);
        });
      stomp.current.connect({ Authorization: `Bearer ${auth.token}` }, () => {
        // 구독할 대상
        stomp.current.subscribe(`/sub/${chatRoom.chatRoomId}`, (response) => {
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
    stomp.current.send(`/room/${chatRoom.chatRoomId}`, text);
    setText('');
  };
  function showChat() {
    return (
      <>
        {chatList.map((list, index) =>
          list.userId === auth.id ? (
            <div key={index}>
              <div type="textMessage">
                <div className="flex items-end w-auto mb-2 flex-start space-x-1 flex-row-reverse space-x-reverse">
                  <div className="p-3 rounded-xl h-auto rounded-tr bg-[#363C45] text-white w-auto">
                    <p className="break-all whitespace-pre-wrap">
                      {list.message}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="block text-[13px] uppercase text-end">
                      {list.sendTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div key={index}>
              <div type="textMessage">
                <div className="flex items-end w-auto mb-2 flex-start space-x-1">
                  <div className="p-3 rounded-xl h-auto rounded-tl bg-white w-auto">
                    <p className="break-all whitespace-pre-wrap">
                      {list.message}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="block text-[13px] uppercase text-start">
                      {list.sendTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </>
    );
  }

  return (
    <>
      <div className="h-full overflow-auto">
        <div className="p-5 h-full bg-[#e9edef] overflow-auto">
          <div></div>
          <div>
            <span className="block text-center text-[14px] py-4">
              2024년 1월 5일
            </span>
            {showChat()}
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
}
