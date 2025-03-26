function ControlButton({ color, children, onClick: handleClick }) {
  return (
    <button
      data-color={color}
      onClick={handleClick}
      className="font-medium data-[color=green]:text-green-text data-[color=gray]:text-gray-818181 cursor-pointer"
    >
      {children}
    </button>
  );
}

export default ControlButton;
