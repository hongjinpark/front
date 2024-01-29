import { createContext, useState } from 'react';

const DeleteModalContext = createContext({});

export const DeleteModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdId, setPdId] = useState();
  const openDeleteModal = () => {
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
  };

  return (
    <DeleteModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openDeleteModal,
        closeModal: closeDeleteModal,
        pdId,
        setPdId,
      }}
    >
      {children}
    </DeleteModalContext.Provider>
  );
};

export default DeleteModalContext;
