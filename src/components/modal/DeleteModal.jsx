import { useContext } from 'react';
import DeleteModalContext from '../../context/DeleteModalProvider';
import CenterModal from './CenterModal';
import { deleteProduct } from '../../api/product.api';
import ToastContext from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
export default function DeleteModal() {
  const { setIsOpen, pdId } = useContext(DeleteModalContext);
  const toastContext = useContext(ToastContext);
  const navigate = useNavigate();
  const handleDelete = () => {
    deleteProduct(pdId).then(() => {
      setIsOpen(false);
      toastContext.setToastMessage(['삭제되었습니다.']);
      navigate('/');
    });
  };
  const bodyContent = () => {
    return (
      <div className="flex flex-col justify-between bg-white p-5 min-h-[220px] min-[480px]:min-w-[400px]">
        <div className="md:text-lg font-normal text-black text-center overflow-hidden flex-auto flex justify-center flex-col outline-none mb-3 items-center">
          <div className="flex flex-col items-center justify-center px-5 pb-5 pt-7">
            <p className="mb-1 text-base font-medium text-left text-jnGray-700">
              상품을 삭제하시겠습니까?
            </p>
            <p className="text-base font-medium text-left text-jnGray-700">
              삭제된 상품은 복구되지 않습니다.
            </p>
          </div>
        </div>
        <div className="flex space-x-2 w-full shrink-0 text text-base h-[52px]">
          <button
            onClick={() => setIsOpen(false)}
            data-variant="flat"
            className="md:text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center placeholder-white focus-visible:outline-none focus:outline-none rounded-md px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:shadow-cart bg-white border-gray-400 border flex-grow text-[16px] text-black focus-visible:ring hover:bg-white hover:text-black"
          >
            취소
          </button>
          <button
            onClick={() => handleDelete()}
            data-variant="flat"
            className="md:text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none rounded-md text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:shadow-cart bg-[rgba(20,19,19,0.97)] hover:bg-[rgba(21,20,20,0.9)] active:bg-jnblack/90 flex-grow text-[16px] focus-visible:ring"
          >
            확인
          </button>
        </div>
      </div>
    );
  };
  return (
    <CenterModal
      ModalContext={DeleteModalContext}
      bodyContent={bodyContent()}
    />
  );
}
