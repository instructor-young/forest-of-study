import { useParams } from "react-router";
import API from "../../../api/index.api";
import { useModal } from "../../../contexts/modal.context";
import HabitsModal from "./HabitsModal";

function TodayHabits({ habits, password, refetchTodayHabits }) {
  const modal = useModal();
  const { studyId } = useParams();

  const handleClickEdit = () => {
    modal.open(<HabitsModal studyId={studyId} habits={habits} password={password} refetchTodayHabits={refetchTodayHabits} />);
  };

  const handleClickTodayHabit = (habitId) => async () => {
    await API.studies.toggleTodayHabit(studyId, habitId, password);
    await refetchTodayHabits();
  };

  return (
    <div className="mt-6 rounded-[20px] min-h-[500px] border px-6 py-10 border-gray-dddddd">
      <div className="max-w-[400px] w-full mx-auto">
        <div className="mb-6 relative">
          <h5 className="font-extrabold text-2xl text-black-414141 text-center">오늘의 습관</h5>
          <button
            onClick={handleClickEdit}
            className="absolute right-0 top-1/2 -translate-y-1/2 font-medium text-sm text-gray-818181 cursor-pointer"
          >
            목록 수정
          </button>
        </div>

        {habits.length > 0 ? (
          <ul className="grid grid-cols-1 gap-y-5">
            {habits.map((habit) => (
              <li key={habit.id}>
                <TodayHabit label={habit.title} isActive={habit.habitRecords.length > 0} onClick={handleClickTodayHabit(habit.id)} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full mt-36 text-center font-medium text-gray-818181">
            아직 습관이 없어요. <br />
            목록 수정을 눌러 습관을 생성해 보세요.
          </div>
        )}
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
