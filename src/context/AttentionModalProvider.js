import { createContext, useState } from 'react';

const AttentionModalContext = createContext({});

export const AttentionModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAttentionModal = () => {
    setIsOpen(true);
  };

  const closeAttentionModal = () => {
    setIsOpen(false);
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
