import { createContext, useState } from 'react';

const ChatModalContext = createContext({});

export const ChatModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState();
  const openChatModal = () => {
    setIsOpen(true);
  };

  const closeChatModal = () => {
    setIsOpen(false);
  };

  return (
    <ChatModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openChatModal,
        closeModal: closeChatModal,
        step,
        setStep,
      }}
    >
      {children}
    </ChatModalContext.Provider>
  );
};

export default ChatModalContext;
