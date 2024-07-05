/* eslint-disable react/prop-types */

const Modal = ({ children }) => {
  return (
    <div className='fixed inset-0  bg-black/30 backdrop-blur-sm flex items-center justify-center w-full h-screen'>
      {children}
    </div>
  );
};

export default Modal;
