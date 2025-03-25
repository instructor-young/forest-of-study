import CreateButtonLarge from "../../assets/img/btn-create-lg.png";
import Input from "../../components/Input";
import Page from "../../components/Page";
import BackgroundSelector from "./components/BackgroundSelector";

function CreateStudyPage() {
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <Page>
      <article className="bg-white w-[696px] rounded-[20px] p-6 pb-10 mx-auto">
        <h1 className="font-extrabold text-2xl text-black-414141">
          스터디 만들기
        </h1>

        <form onSubmit={handleSubmitForm} className="mt-6 space-y-6">
          <Input label="닉네임" placeholder="닉네임을 입력해 주세요" />
          <Input
            label="스터디 이름"
            placeholder="스터디 이름을 입력해 주세요"
          />
          <Input
            label="소개"
            placeholder="소개 멘트를 작성해 주세요"
            multiline
            rows={3}
          />
          <BackgroundSelector />
          <Input label="비밀번호" placeholder="비밀번호를 입력해 주세요" />
          <Input label="비밀번호 확인" placeholder="비밀번호를 입력해 주세요" />

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
