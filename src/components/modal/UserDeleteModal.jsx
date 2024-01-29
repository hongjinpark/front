import Modal from './Modal';
import UserDeleteModalContext from '../../context/UserDeleteModalProvider';
import { deleteUser } from '../../api/user.api';
import ToastContext from '../../context/ToastContext';
import { useContext } from 'react';

export default function UserDeleteModal() {
  const { isOpen, setIsOpen } = useContext(UserDeleteModalContext);
  const toastContext = useContext(ToastContext);
  const handleSaveUserDelete = () => {
    deleteUser().then(() => {
      toastContext.setToastMessage(['탈퇴되었습니다.']);
      setIsOpen(false);
      console.log(isOpen);
    });
  };

  const bodyContent = () => {
    return (
      <div
        id="container"
        className="flex flex-col flex-1 w-full h-full bg-white justify-end mb-10"
      >
        <div>
          <div>
            <div className="flex justify-center items-center bg-white self-end mt-8 px-5">
              <button
                onClick={() => handleSaveUserDelete()}
                disabled=""
                className="relative flex rounded justify-center items-center w-full h-14 bg-black text-white"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      ModalContext={UserDeleteModalContext}
      title={'회원 탈퇴'}
      bodyContent={bodyContent()}
    />
  );
}
