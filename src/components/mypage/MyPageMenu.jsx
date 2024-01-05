import { useContext } from 'react';
import PurchaseModalContext from '../../context/PurchaseModalProvider';
import SaleModalContext from '../../context/SaleModalProvider';
import ProfileModalContext from '../../context/ProfileModalProvider';
import SelectedModalContext from '../../context/SelectedModalProvider';
import AttentionModalContext from '../../context/AttentionModalProvider';

export default function MyPageMenu() {
  const { openModal: openPurchaseModal } = useContext(PurchaseModalContext);
  const { openModal: openSaleModal } = useContext(SaleModalContext);
  const { openModal: openProfileModal } = useContext(ProfileModalContext);
  const { openModal: openSelectedModal } = useContext(SelectedModalContext);
  const { openModal: openAttentionModal } = useContext(AttentionModalContext);
  return (
    <div className="hidden lg:block mt-6 min-w-[150px] basis-[300px] flex-shrink [&_ul]:mb-4 [&_li]:w-fit [&_li]:cursor-pointer [&_li]:mb-2 [&_li]:text-gray-600">
      <h2 className="mb-3 text-2xl font-semibold">마이 페이지</h2>
      <h3 className="mb-2 text-xl font-semibold">쇼핑 정보</h3>
      <ul className="flex-col flex">
        <button onClick={() => openPurchaseModal()}>
          <li>구매내역</li>
        </button>
        <button onClick={() => openSaleModal()}>
          <li>판매내역</li>
        </button>
        <button onClick={() => openSelectedModal()}>
          <li>조회내역</li>
        </button>
        <button onClick={() => openAttentionModal()}>
          <li>관심내역</li>
        </button>
      </ul>
      <h3 className="mb-2 text-xl font-semibold">내 정보</h3>
      <ul>
        <button onClick={() => openProfileModal()}>
          <li>프로필 수정</li>
        </button>
        <li>계좌 관리</li>
        <li>배송지 관리</li>
        <li>이용 후기</li>
      </ul>
    </div>
  );
}
