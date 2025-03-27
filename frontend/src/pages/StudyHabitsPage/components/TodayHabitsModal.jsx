import { useState } from "react";
import Modal from "../../../components/Modal";

function TodayHabitsModal() {
  const [habits, setHabits] = useState([]);

  return (
    <Modal>
      <h5 className="mb-6 font-extrabold text-2xl text-black-414141 text-center">습관 목록</h5>

      <div className="min-h-[480px]">
        <TodayHabit habit={{}} />
        <div>미라클모닝 6시 기상</div>
      </div>
    </Modal>
  );
}

function TodayHabit({ habit }) {}

export default TodayHabitsModal;
