function TodayHabits() {
  return (
    <div className="mt-6 rounded-[20px] min-h-[500px] border px-6 py-10 border-gray-dddddd">
      <div className="max-w-[400px] w-full mx-auto">
        <div className="mb-6 relative">
          <h5 className="font-extrabold text-2xl text-black-414141 text-center">오늘의 습관</h5>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 font-medium text-sm text-gray-818181 cursor-pointer">목록 수정</button>
        </div>

        <ul className="grid grid-cols-1 gap-y-5">
          <li>
            <TodayHabit label={"미라클모닝 6시 기상"} isActive />
          </li>
          <li>
            <TodayHabit label={"아침 챙겨 먹기"} isActive />
          </li>
          <li>
            <TodayHabit label={"책 1시간 읽기"} />
          </li>
          <li>
            <TodayHabit label={"스트레칭"} />
          </li>
          <li>
            <TodayHabit label={"사이드 프로젝트"} />
          </li>
        </ul>
      </div>
    </div>
  );
}

function TodayHabit({ label, isActive, onClick: handleClick }) {
  return (
    <button
      data-is-active={isActive}
      onClick={handleClick}
      className="rounded-[20px] bg-gray-eeeeee text-gray-818181 w-full h-[54px] grid place-items-center font-bold data-[is-active=true]:text-white data-[is-active=true]:bg-[#99C08E] hover:brightness-95 active:brightness-90 transition"
    >
      {label}
    </button>
  );
}

export default TodayHabits;
