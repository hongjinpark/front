import { createContext, useState } from 'react';

const AttentionModalContext = createContext({});

export const AttentionModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAttentionModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeAttentionModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <AttentionModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openAttentionModal,
        closeModal: closeAttentionModal,
      }}
    >
      {children}
    </AttentionModalContext.Provider>
  );
};

export default AttentionModalContext;
