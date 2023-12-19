import { createContext, useState } from 'react';

const SelectedModalContext = createContext({});

export const SelectedModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSelectedModal = () => {
    setIsOpen(true);
  };

  const closeSelectedModal = () => {
    setIsOpen(false);
  };

  return (
    <SelectedModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openSelectedModal,
        closeModal: closeSelectedModal,
      }}
    >
      {children}
    </SelectedModalContext.Provider>
  );
};

export default SelectedModalContext;
