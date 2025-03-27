import IconArrowRight from "../../../assets/img/icon_arrow_right.png";

function TodayButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="h-12 pl-6 pr-4 border border-gray-dddddd bg-white inline-flex items-center gap-x-1 rounded-2xl hover:brightness-95 active:brightness-90 transition cursor-pointer"
    >
      <span className="text-gray-818181 font-medium">{children}</span>
      <img src={IconArrowRight} className="size-6" />
    </button>
  );
}

export default TodayButton;
