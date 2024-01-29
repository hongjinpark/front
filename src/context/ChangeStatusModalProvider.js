import { createContext, useState } from 'react';

const ChangeStatusModalContext = createContext({});

export const ChangeStatusModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pdId, setPdId] = useState();
  const [pdStatus, setPdStatus] = useState();
  const openChangeStatusModal = () => {
    setIsOpen(true);
  };

  const closeChangeStatusModal = () => {
    setIsOpen(false);
  };

  return (
    <ChangeStatusModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openChangeStatusModal,
        closeModal: closeChangeStatusModal,
        pdId,
        setPdId,
        pdStatus,
        setPdStatus,
      }}
    >
      {children}
    </ChangeStatusModalContext.Provider>
  );
};

export default ChangeStatusModalContext;
