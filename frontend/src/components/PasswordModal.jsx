import { useState } from "react";
import API from "../api/index.api";
import ModificationBtn from "../assets/img/btn_modification.png";
import { useModal } from "../contexts/modal.context";
import Modal from "./Modal";
import PasswordInput from "./PasswordInput";

function PasswordModal({ study, onSuccess }) {
  const modal = useModal();
  const [password, setPassword] = useState("");

  const handleClickButton = async () => {
    const isCorrect = await API.studies.checkStudyPassword(study.id, password);

    if (isCorrect) {
      onSuccess();
    }
  };

  return (
    <Modal>
      <header className="flex items-center justify-center relative">
        <h5 className="font-extrabold text-2xl text-black-414141">
          {study.name}
        </h5>

        <button
          type="button"
          onClick={modal.close}
          className="absolute right-0 top-1/2 -translate-y-1/2 font-medium text-green-text cursor-pointer"
        >
          나가기
        </button>
      </header>

      <p className="mt-7 font-medium text-lg text-gray-818181 text-center mb-6">
        권한이 필요해요!
      </p>

      <PasswordInput
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
      />

      <button
        type="button"
        className="mt-10 cursor-pointer"
        onClick={handleClickButton}
      >
        <img
          src={ModificationBtn}
          className="h-[58px] hover:brightness-95 active:brightness-90 transition"
        />
      </button>
    </Modal>
  );
}

export default PasswordModal;
