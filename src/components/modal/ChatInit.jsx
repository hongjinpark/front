import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/product.api';
import useAuth from '../../hooks/useAuth';
import ChatModalContext from '../../context/ChatModalProvider';
import { createChatRoom, existChatRoom, getChatRoom } from '../../api/chat.api';
export default function ChatInit({ setTitle, setChatRoom }) {
  const location = useLocation();
  const [product, setProduct] = useState();
  const [text, setText] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { setIsOpen, setStep } = useContext(ChatModalContext);
  useEffect(() => {
    if (!auth) {
      navigate('/login');
      setIsOpen(false);
    }
    const pdId = location.pathname.replace('/product/', '');
    existChatRoom(pdId).then((res) => {
      const data = res.data;
      if (data) {
        setChatRoom(data);
        setStep('chat');
      }
    });
    getProductById(pdId).then((res) => {
      setProduct(res.data);
      setTitle(res.data.user_nickname);
    });
  }, []);

  const handleSend = () => {
    createChatRoom(text, location.pathname.replace('/product/', '')).then(
      (res) => {
        const id = res.data;
        getChatRoom(id).then((res) => {
          setChatRoom(res.data);
          setStep('chat');
        });
      }
    );
  };

  useEffect(() => {
    setText(
      `[상품정보 보내기] 안녕하세요. [${product?.pdTitle}] 보고 문의드립니다.`
    );
  }, [product]);
  return (
    <>
      <div className="h-full overflow-auto">
        <div className="p-5 h-full bg-[#e9edef] overflow-auto">
          <div></div>
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              color="#141313"
              height="48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 319.91a20 20 0 1120-20 20 20 0 01-20 20zm21.72-201.15l-5.74 122a16 16 0 01-32 0l-5.74-121.94v-.05a21.74 21.74 0 1143.44 0z"></path>
            </svg>
            <h2 className="font-semibold text-jnblack">
              중고나라 채팅, 중고나라 페이가 <br /> 가장 안전합니다!
            </h2>
            <p className="text-[14px]">
              카카오톡이나 라인 등으로 대화를 유도하거나 <br />
              URL(링크)결제 유도 및 직접송금을 요구하는 경우
              <br />
              피해 위험이 있으니 주의하세요!
            </p>
            <button className="w-full bg-white text-jnblack text-[14px] py-3 border-[1px] border-gray-500 rounded-sm">
              중고나라 페이 이용방법
            </button>
          </div>
        </div>
      </div>
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
              onClick={() => handleSend()}
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
