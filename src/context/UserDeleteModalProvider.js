import { createContext, useState } from 'react';

const UserDeleteModalContext = createContext({});

export const UserDeleteModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openUserDeleteModal = () => {
    setIsOpen(true);
  };

  const closeUserDeleteModal = () => {
    setIsOpen(false);
  };

  return (
    <UserDeleteModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openUserDeleteModal,
        closeModal: closeUserDeleteModal,
      }}
    >
      {children}
    </UserDeleteModalContext.Provider>
  );
};

export default UserDeleteModalContext;
