import ChatModal from '../components/modal/ChatModal';
import ProfileModal from '../components/modal/ProfileModal';
import PurchaseModal from '../components/modal/PurchaseModal';
import SelectedModal from '../components/modal/SelectedModal';
import SaleModal from './../components/modal/SaleModal';
import AttentionModal from '../components/modal/AttentionModal';
import RegionModal from '../components/modal/RegionModal';
import DeleteModal from '../components/modal/DeleteModal';
import UserDeleteModal from '../components/modal/UserDeleteModal';
import ChangeStatusModal from '../components/modal/ChangeStatusModal';

export default function ModalProvider() {
  return (
    <>
      <PurchaseModal />
      <SaleModal />
      <ProfileModal />
      <SelectedModal />
      <ChatModal />
      <AttentionModal />
      <RegionModal />
      <DeleteModal />
      <UserDeleteModal />
      <ChangeStatusModal />
    </>
  );
}
