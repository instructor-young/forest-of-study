import Backdrop from "./Backdrop";

function Modal({ children }) {
  return (
    <Backdrop>
      <article className="w-[648px] bg-white rounded-[20px] py-10 px-6">
        {children}
      </article>
    </Backdrop>
  );
}

export default Modal;
