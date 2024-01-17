import { useContext, useEffect, useState } from 'react';
import ChatModalContext from '../../context/ChatModalProvider';
import Modal from './Modal';
import ChatRoom from './ChatRoom';
import ChatBody from './ChatBody';
import useAuth from '../../hooks/useAuth';
import ChatInit from './ChatInit';

export default function ChatModal() {
  const { step } = useContext(ChatModalContext);
  const { auth } = useAuth();
  const [chatRoom, setChatRoom] = useState();
  useEffect(() => {});

  const findNickName = () => {
    return auth?.id === chatRoom.buyUser.id
      ? chatRoom.buyUser.userInfo
        ? chatRoom.sellUser.userInfo.usrNickName
        : chatRoom.sellUser.nickname
      : chatRoom.buyUser.userInfo
        ? chatRoom.buyUser.userInfo.usrNickName
        : chatRoom.buyUser.nickname;
  };
  return (
    <Modal
      ModalContext={ChatModalContext}
      title={step === 'room' ? '채팅' : step === 'chat' ? findNickName() : null}
      bodyContent={
        step === 'room' ? (
          <ChatRoom setChatRoom={setChatRoom} />
        ) : step === 'chat' ? (
          <ChatBody chatRoom={chatRoom} />
        ) : step === 'init' ? (
          <ChatInit />
        ) : null
      }
    />
  );
}
