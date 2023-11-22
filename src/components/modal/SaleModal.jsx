import SaleModalContext from '../../context/SaleModalProvider';
import Modal from './Modal';
export default function SaleModal() {
  return <Modal ModalContext={SaleModalContext} title={'판매 내역'} />;
}
