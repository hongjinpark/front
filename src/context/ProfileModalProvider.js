import { createContext, useState } from 'react';

const ProfileModalContext = createContext({});

export const ProfileModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openProfileModal = () => {
    setIsOpen(true);
  };

  const closeProfileModal = () => {
    setIsOpen(false);
  };

  return (
    <ProfileModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openModal: openProfileModal,
        closeModal: closeProfileModal,
      }}
    >
      {children}
    </ProfileModalContext.Provider>
  );
};

export default ProfileModalContext;
