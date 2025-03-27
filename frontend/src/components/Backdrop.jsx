function Backdrop({ children }) {
  return (
    <div className="fixed inset-0 bg-black/50 grid place-items-center">
      {children}
    </div>
  );
}

export default Backdrop;
