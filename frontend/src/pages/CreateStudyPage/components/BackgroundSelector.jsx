import Bg1 from "../../../assets/img/bg-1.png";
import Bg2 from "../../../assets/img/bg-2.png";
import Bg3 from "../../../assets/img/bg-3.png";
import Bg4 from "../../../assets/img/bg-4.png";
import BackgroundSelectorColorBg from "./BackgroundSelectorColorBg";
import BackgroundSelectorImgBg from "./BackgroundSelectorImgBg";

const backgroundColors = ["green", "yellow", "blue", "pink"];
const backgroundImages = [
  ["Bg1", Bg1],
  ["Bg2", Bg2],
  ["Bg3", Bg3],
  ["Bg4", Bg4],
];

function BackgroundSelector({
  onClickBackground: handleClickBackground,
  seletedBackground,
}) {
  return (
    <section>
      <label className="font-semibold text-black-414141 text-lg">
        배경을 선택해 주세요
      </label>

      <div className="grid grid-cols-4 grid-rows-2 gap-4 mt-6">
        {backgroundColors.map((backgroundColor) => (
          <BackgroundSelectorColorBg
            key={backgroundColor}
            color={backgroundColor}
            onClick={() => handleClickBackground(backgroundColor)}
            isSelected={seletedBackground === backgroundColor}
          />
        ))}

        {backgroundImages.map((backgroundImage) => (
          <BackgroundSelectorImgBg
            key={backgroundImage[0]}
            imgSrc={backgroundImage[1]}
            onClick={() => handleClickBackground(backgroundImage[0])}
            isSelected={seletedBackground === backgroundImage[0]}
          />
        ))}
      </div>
    </section>
  );
}

export default BackgroundSelector;
