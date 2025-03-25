import SeletedIcon from "../../../assets/img/icon-selected.png";

function BackgroundSelectorImgBg({ imgSrc, onClick: handleClick, isSelected }) {
  return (
    <button onClick={handleClick} className="aspect-square relative">
      <img
        src={imgSrc}
        data-is-selected={isSelected}
        className="w-full h-full border border-black/10 rounded-2xl hover:brightness-95 active:brightness-90 transition data-[is-selected='true']:brightness-75"
      />
      {isSelected && (
        <img
          src={SeletedIcon}
          className="h-8 w-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        />
      )}
    </button>
  );
}

export default BackgroundSelectorImgBg;
