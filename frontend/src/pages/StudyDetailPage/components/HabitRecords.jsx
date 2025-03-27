import HabitRecordRow from "./HabitRecordRow";

function HabitRecords() {
  return (
    <article className="rounded-[20px] p-6 border border-gray-dddddd min-h-[500px]">
      <h2 className="text-2xl font-extrabold text-black-414141 mb-6">
        습관 기록표
      </h2>

      <div className="grid-cols-[1fr_3fr] grid">
        {/* 헤더 */}
        <div className="grid-cols-subgrid col-span-2 grid">
          <div></div>
          <div className="grid grid-cols-7 place-items-center text-gray-818181 text-lg">
            <div>월</div>
            <div>화</div>
            <div>수</div>
            <div>목</div>
            <div>금</div>
            <div>토</div>
            <div>일</div>
          </div>
        </div>

        {Array(18)
          .fill(0)
          .map((_, index) => (
            <HabitRecordRow key={index} index={index + 1} />
          ))}
        {/* 내용 */}
      </div>
    </article>
  );
}

export default HabitRecords;
