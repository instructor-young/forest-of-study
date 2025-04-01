import HabitRecordRow from "./HabitRecordRow";

function HabitRecords({ habits }) {
  return (
    <article data-length={habits.length} className="group rounded-[20px] p-6 border border-gray-dddddd">
      <h2 className="text-2xl font-extrabold text-black-414141 mb-6">습관 기록표</h2>

      {habits.length > 0 ? (
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

          {habits.map((habit, index) => (
            <HabitRecordRow key={habit.id} habit={habit} index={index + 1} />
          ))}
          {/* 내용 */}
        </div>
      ) : (
        <div className="group-data-[length=0]:min-h-[400px] grid place-items-center">
          <p className="text-center font-medium text-gray-818181">
            아직 습관이 없어요.
            <br />
            오늘의 습관에서 습관을 생성해 보세요
          </p>
        </div>
      )}
    </article>
  );
}

export default HabitRecords;
