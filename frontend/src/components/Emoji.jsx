function Emoji({ emoji, count, size = "md" }) {
  return (
    <div
      data-size={size}
      className="data-[size=sm]:h-[26px] data-[size=sm]:text-[12px] h-8 px-2 rounded-[50px] bg-black/50 text-white flex items-center gap-x-1.5 text-base"
    >
      <span>{emoji}</span>
      <span className="font-medium">{count}</span>
    </div>
  );
}

export default Emoji;
