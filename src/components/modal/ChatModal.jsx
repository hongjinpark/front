import { useContext, useState } from 'react';
import ChatModalContext from '../../context/ChatModalProvider';
import Modal from './Modal';
import ChatRoom from './ChatRoom';
import ChatBody from './ChatBody';
import ChatInit from './ChatInit';

export default function ChatModal() {
  const { step } = useContext(ChatModalContext);
  const [chatRoom, setChatRoom] = useState();
  const [title, setTitle] = useState();

  return (
    <Modal
      ModalContext={ChatModalContext}
      title={title}
      bodyContent={
        step === 'room' ? (
          <ChatRoom setChatRoom={setChatRoom} setTitle={setTitle} />
        ) : step === 'chat' ? (
          <ChatBody chatRoom={chatRoom} setTitle={setTitle} />
        ) : step === 'init' ? (
          <ChatInit setTitle={setTitle} setChatRoom={setChatRoom} />
        ) : null
      }
    />
  );
}
