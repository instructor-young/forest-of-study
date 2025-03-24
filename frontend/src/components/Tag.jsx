import { cx } from "class-variance-authority";
import IconPerson from "../assets/img/icon-person.png";
import IconPoint from "../assets/img/icon-point.png";

function Tag({ type, value, theme }) {
  const icon =
    type === "point" ? (
      <img src={IconPoint} className="w-[14px] h-[14px" />
    ) : (
      <img src={IconPerson} className="w-3 h-3" />
    );
  const label = type === "point" ? `${value}P 획득` : value;
  const themeClassNames = cx({
    "bg-black/50 text-white": theme === "dark",
    "bg-white/30 text-black-414141": theme === "light",
  });

  return (
    <div
      className={cx(
        "rounded-[50px] border font-medium text-xs border-black/10 flex py-1 px-3",
        themeClassNames
      )}
    >
      {icon}
      <span className="ml-1">{label}</span>
    </div>
  );
}

export default Tag;
