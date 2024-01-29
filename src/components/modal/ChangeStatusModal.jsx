import { useContext } from 'react';
import ChangeStatusModalContext from '../../context/ChangeStatusModalProvider';
import CenterModal from './CenterModal';
import { updateProductStatus } from '../../api/product.api';
import { useNavigate } from 'react-router-dom';
export default function ChangeStatusModal() {
  const { pdId, setIsOpen, pdStatus } = useContext(ChangeStatusModalContext);
  const navigate = useNavigate();

  const bodyContent = () => {
    return (
      <div className="flex flex-col w-full">
        <p className="font-medium text-center text-l py-[11px]">상태변경</p>
        <ul className="flex flex-col mt-3 mb-6 ml-36">
          {pdStatus === 'R' ? (
            <li className="py-[14px] [&amp;>button]:w-full [&amp;>button]:text-left">
              <button
                onClick={() => {
                  updateProductStatus(pdId, 'Y');
                  setIsOpen(false);
                  navigate(0);
                }}
              >
                판매중
              </button>
            </li>
          ) : (
            <li className="py-[14px] [&amp;>button]:w-full [&amp;>button]:text-left">
              <button
                onClick={() => {
                  updateProductStatus(pdId, 'R');
                  setIsOpen(false);
                  navigate(0);
                }}
              >
                예약중
              </button>
            </li>
          )}

          <li className="py-[14px] [&amp;>button]:w-full [&amp;>button]:text-left">
            <button
              onClick={() => {
                updateProductStatus(pdId, 'C');
                setIsOpen(false);
                navigate(0);
              }}
            >
              판매완료
            </button>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <CenterModal
      ModalContext={ChangeStatusModalContext}
      bodyContent={bodyContent()}
    />
  );
}
