import SeletedIcon from "../../../assets/img/icon-selected.png";

function BackgroundSelectorImgBg({ imgSrc, onClick: handleClick, isSelected }) {
  return (
    <button onClick={handleClick} className="aspect-square">
      <img
        src={imgSrc}
        className="w-full h-full border border-black/10 rounded-2xl hover:brightness-95 active:brightness-90 transition"
      />
      {isSelected && <img src={SeletedIcon} className="h-8 w-8" />}
    </button>
  );
}

export default BackgroundSelectorImgBg;
