import { Picker } from "emoji-mart";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import API from "../api/index.api";
import SmileIcon from "../assets/img/icon_smile.png";

function AddEmojiButton({ fetchStudy }) {
  const { studyId } = useParams();
  const emojiMartContainerDOMRef = useRef(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const handleClickButton = () => {
    setIsPickerVisible((prev) => !prev);
  };

  const addEmoji = (emoji) => API.studies.addEmoji(studyId, emoji);

  useEffect(() => {
    const picker = new Picker({
      data: async () => {
        const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data");

        return response.json();
      },
      onEmojiSelect: async (emoji) => {
        await addEmoji(emoji.native);
        setIsPickerVisible(false);
        await fetchStudy();
      },
    });

    emojiMartContainerDOMRef.current.appendChild(picker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <button
        onClick={handleClickButton}
        className="border border-black/10 h-[32px] px-2 bg-white/30 text-black-414141 font-medium leading-none flex items-center gap-x-1.5 rounded-[50px] hover:brightness-90 active:brightness-75 transition"
      >
        <img src={SmileIcon} className="size-[18px]" />
        <span>추가</span>
      </button>
      <div
        data-is-visible={isPickerVisible}
        className="hidden data-[is-visible=true]:block absolute top-[40px] left-0 z-10"
        ref={emojiMartContainerDOMRef}
      ></div>
    </div>
  );
}

export default AddEmojiButton;
