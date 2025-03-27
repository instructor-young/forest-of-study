import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import API from "../../api/index.api";
import CreateButtonLarge from "../../assets/img/btn-create-lg.png";
import Page from "../../components/Page";
import PasswordInput from "../../components/PasswordInput";
import TextInput from "../../components/TextInput";
import BackgroundSelector from "../CreateStudyPage/components/BackgroundSelector";

function EditStudyPage() {
  const { studyId } = useParams();
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isPasswordCorrect, setIspasswordCorrect] = useState(false);
  const [study, setStudy] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [background, setBackground] = useState("green");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state;

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!ownerName) return alert("닉네임을 입력해 주세요");
    if (!name) return alert("스터디 이름을 입력해 주세요");
    if (!description) return alert("소개를 입력해 주세요");
    if (newPassword !== newPasswordConfirm)
      return alert("비밀번호가 일치하지 않습니다");

    const data = {
      password: location.state,
      ownerName,
      name,
      description,
      background,
      newPassword,
    };

    await API.studies.updateStudy(studyId, data);

    navigate("/");
  };

  useEffect(() => {
    API.studies.checkStudyPassword(studyId, password).then((result) => {
      setIspasswordCorrect(result);
      setIsPasswordConfirmed(true);
    });
  }, [studyId, password]);

  useEffect(() => {
    API.studies.getStudy(studyId).then(setStudy);
  }, [studyId]);

  useEffect(() => {
    if (!study) return;

    setOwnerName(study.ownerName);
    setName(study.name);
    setDescription(study.description);
    setBackground(study.background);
  }, [study]);

  if (!isPasswordConfirmed) return "인증 중입니다...";
  if (!isPasswordCorrect) return "잘못된 접근입니다";
  if (!study) return "로딩 중입니다...";

  return (
    <Page>
      <article className="bg-white w-[696px] rounded-[20px] p-6 pb-10 mx-auto">
        <h1 className="font-extrabold text-2xl text-black-414141">
          스터디 수정하기
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
            label="새로운 비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="새로운 비밀번호 확인"
            placeholder="비밀번호를 입력해 주세요"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
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

export default EditStudyPage;
