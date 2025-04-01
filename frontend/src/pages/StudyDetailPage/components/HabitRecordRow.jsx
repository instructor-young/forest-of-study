import Sticker0 from "../../../assets/img/sticker-0.png";
import Sticker1 from "../../../assets/img/sticker-1.png";
import Sticker10 from "../../../assets/img/sticker-10.png";
import Sticker11 from "../../../assets/img/sticker-11.png";
import Sticker12 from "../../../assets/img/sticker-12.png";
import Sticker13 from "../../../assets/img/sticker-13.png";
import Sticker14 from "../../../assets/img/sticker-14.png";
import Sticker15 from "../../../assets/img/sticker-15.png";
import Sticker16 from "../../../assets/img/sticker-16.png";
import Sticker17 from "../../../assets/img/sticker-17.png";
import Sticker18 from "../../../assets/img/sticker-18.png";
import Sticker2 from "../../../assets/img/sticker-2.png";
import Sticker3 from "../../../assets/img/sticker-3.png";
import Sticker4 from "../../../assets/img/sticker-4.png";
import Sticker5 from "../../../assets/img/sticker-5.png";
import Sticker6 from "../../../assets/img/sticker-6.png";
import Sticker7 from "../../../assets/img/sticker-7.png";
import Sticker8 from "../../../assets/img/sticker-8.png";
import Sticker9 from "../../../assets/img/sticker-9.png";

const stickers = [
  Sticker0,
  Sticker1,
  Sticker2,
  Sticker3,
  Sticker4,
  Sticker5,
  Sticker6,
  Sticker7,
  Sticker8,
  Sticker9,
  Sticker10,
  Sticker11,
  Sticker12,
  Sticker13,
  Sticker14,
  Sticker15,
  Sticker16,
  Sticker17,
  Sticker18,
];

function HabitRecordRow({ habit, index }) {
  const stickerSrc = stickers[index];
  const daysOfHabitRecords = habit.habitRecords.map((habitRecord) => new Date(habitRecord.recordedAt).getDay());

  const getIsActive = (day) => daysOfHabitRecords.includes(day);

  return (
    <div className="grid-cols-subgrid col-span-2 grid h-16">
      <div className="place-content-center text-black-414141 font-bold text-right px-6">{habit.title}</div>
      <div className="grid grid-cols-7 place-items-center text-gray-818181 text-lg">
        {[1, 2, 3, 4, 5, 6, 0].map((dayInNumber) => (
          <div key={dayInNumber}>
            <img src={getIsActive(dayInNumber) ? stickerSrc : Sticker0} className="size-9" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitRecordRow;
