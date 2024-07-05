import { Outlet } from "react-router-dom";
import Modal from "../components/ui/modal/Modal";
import { useModal } from "../contexts/ModalContext";

const RootLayout = () => {
  const { isModalOpen, ModalContent } = useModal();
  return (
    <div className='h-screen'>
      <Outlet />
      {isModalOpen && <Modal>{ModalContent}</Modal>}
    </div>
  );
};

export default RootLayout;
