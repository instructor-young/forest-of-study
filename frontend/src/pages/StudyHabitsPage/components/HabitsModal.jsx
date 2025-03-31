import { useState } from "react";
import { useParams } from "react-router";
import API from "../../../api/index.api";
import MediumCancleButton from "../../../assets/img/btn_cancel_md.png";
import ModificationCompleteButton from "../../../assets/img/btn_modification_complete.png";
import PlusIcon from "../../../assets/img/icon_plus.png";
import TrashIcon from "../../../assets/img/icon_trash.png";
import Modal from "../../../components/Modal";
import { useModal } from "../../../contexts/modal.context";

function HabitsModal({ habits: passedHabits, password }) {
  const { studyId } = useParams();
  const [habits, setHabits] = useState(passedHabits);
  const modal = useModal();

  const handleChangeInput = (id) => (e) => {
    const value = e.target.value;

    setHabits((prev) => prev.map((habit) => (habit.id === id ? { ...habit, title: value } : habit)));
  };

  const handleClickAddNewButton = () => {
    const lastHabit = habits.slice(-1)[0];
    if (lastHabit?.id.includes("new-") && lastHabit?.title === "") return;

    setHabits((prev) => [...prev, { id: "new-" + Date.now(), title: "" }]);
  };

  const handleClickDeleteButton = (id) => () => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const handleClickUpdate = async () => {
    await API.studies.updateStudyHabits(studyId, password, habits);

    modal.close();
  };

  return (
    <Modal>
      <h5 className="mb-6 font-extrabold text-2xl text-black-414141 text-center">습관 목록</h5>

      <div className="min-h-[480px] space-y-5 w-[400px] mx-auto">
        {habits.map((habit, index) => (
          <Habit
            key={habit.id || index}
            habit={habit}
            onChangeInput={handleChangeInput(habit.id)}
            onClickDelete={handleClickDeleteButton(habit.id)}
          />
        ))}

        <button
          onClick={handleClickAddNewButton}
          className="w-full h-[54px] border-2 border-black-414141 rounded-[20px] hover:brightness-[0.97] active:brightness-[0.93] transition bg-white"
        >
          <img src={PlusIcon} className="size-6 mx-auto" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 mt-6">
        <button onClick={modal.close} className="hover:brightness-95 active:brightness-90 transition">
          <img src={MediumCancleButton} />
        </button>
        <button onClick={handleClickUpdate} className="hover:brightness-95 active:brightness-90 transition">
          <img src={ModificationCompleteButton} />
        </button>
      </div>
    </Modal>
  );
}

function Habit({ habit, onChangeInput, onClickDelete: handleClickDelete }) {
  return (
    <div className="relative h-[54px] bg-gray-eeeeee rounded-[20px] mx-auto flex items-center justify-center px-4">
      <input
        value={habit.title}
        onChange={onChangeInput}
        type="text"
        className="font-bold text-gray-818181 outline-none text-center w-full underline underline-offset-4"
        spellCheck={false}
        autoFocus={habit.title === ""}
      />
      <button
        onClick={handleClickDelete}
        className="absolute -right-2 translate-x-full bg-[#FDE0E9] h-12 aspect-square rounded-full flex justify-center items-center"
      >
        <img src={TrashIcon} className="size-6" />
      </button>
    </div>
  );
}

export default HabitsModal;
