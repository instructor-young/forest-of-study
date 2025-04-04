import { useState } from "react";
import { useNavigate } from "react-router";
import API from "../../api/index.api";
import CreateButtonLarge from "../../assets/img/btn-create-lg.png";
import Page from "../../components/Page";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import BackgroundSelector from "./components/BackgroundSelector";

function CreateStudyPage() {
  const [ownerName, setOwnerName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("green");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!ownerName) return alert("닉네임을 입력해 주세요");
    if (!name) return alert("스터디 이름을 입력해 주세요");
    if (!description) return alert("소개를 입력해 주세요");
    if (!password) return alert("비밀번호를 입력해 주세요");
    if (password !== passwordConfirm)
      return alert("비밀번호가 일치하지 않습니다");

    const data = {
      ownerName,
      name,
      description,
      background,
      password,
    };

    await API.studies.createStudy(data);

    navigate("/");
  };

  return (
    <Page>
      <article className="bg-white w-[696px] rounded-[20px] p-6 pb-10 mx-auto">
        <h1 className="font-extrabold text-2xl text-black-414141">
          스터디 만들기
        </h1>

        <form onSubmit={handleSubmitForm} className="mt-6 space-y-6">
          <TextInput
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <TextInput
            label="스터디 이름"
            placeholder="스터디 이름을 입력해 주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="소개"
            placeholder="소개 멘트를 작성해 주세요"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <BackgroundSelector
            seletedBackground={background}
            onClickBackground={setBackground}
          />
          <PasswordInput
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            label="비밀번호 확인"
            placeholder="비밀번호를 입력해 주세요"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          <button>
            <img
              src={CreateButtonLarge}
              className="h-[58px] hover:brightness-95 active:brightness-90 transition"
            />
          </button>
        </form>
      </article>
    </Page>
  );
}

export default CreateStudyPage;
