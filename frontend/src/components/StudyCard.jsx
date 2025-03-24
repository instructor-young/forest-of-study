import Tag from "./Tag";

function StudyCard({ study }) {
  return (
    <article className="p-[30px] rounded-[20px] w-[357px] h-[243px] bg-green-pale border-black/10 border">
      <header>
        <div className="flex items-center justify-between">
          <h6 className="text-lg font-bold">
            <span className="mr-0.5 text-green-text">
              {study.creatorNickname}
            </span>
            <span className="text-black-414141">의 {study.name}</span>
          </h6>

          <Tag theme={"light"} type={"point"} value={310} />
        </div>

        <span className="mt-2.5 inline-block text-gray-818181 text-sm">
          {study.daysFromStart}일째 진행 중
        </span>
      </header>

      <p className="text-black-414141 mt-[30px]">{study.description}</p>
    </article>
  );
}

export default StudyCard;
