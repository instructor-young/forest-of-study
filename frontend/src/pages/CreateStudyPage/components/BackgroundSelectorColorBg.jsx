import { cx } from "class-variance-authority";
import SeletedIcon from "../../../assets/img/icon-selected.png";

function BackgroundSelectorColorBg({
  color,
  onClick: handleClick,
  isSelected,
}) {
  const colorClassName = cx(
    color === "green" && "bg-green-pale",
    color === "yellow" && "bg-yellow-pale",
    color === "blue" && "bg-blue-pale",
    color === "pink" && "bg-pink-pale"
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(
        "cursor-pointer aspect-square border border-black/10 rounded-2xl hover:brightness-95 active:brightness-90 transition flex items-center justify-center",
        colorClassName
      )}
    >
      {isSelected && <img src={SeletedIcon} className="h-8 w-8" />}
    </button>
  );
}

export default BackgroundSelectorColorBg;
