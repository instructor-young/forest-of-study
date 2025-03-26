import { cx } from "class-variance-authority";
import dayjs from "dayjs";
import { Link } from "react-router";
import Tag from "./Tag";

function StudyCard({ study }) {
  const backgroundType =
    study.background?.slice(0, 2) === "Bg" ? "img" : "color";
  const startFrom = dayjs(study.createdAt).diff(dayjs(), "day") + 1;

  console.log("startFrom", startFrom);

  const theme = backgroundType === "color" ? "light" : "dark";

  const colorClassName = cx(
    study.background === "green" && "bg-green-pale",
    study.background === "yellow" && "bg-yellow-pale",
    study.background === "blue" && "bg-blue-pale",
    study.background === "pink" && "bg-pink-pale"
  );

  const imgClassName = cx(
    study.background === "Bg1" && `bg-[url(/src/assets/img/bg-1.jpg)]`,
    study.background === "Bg2" && `bg-[url(/src/assets/img/bg-2.jpg)]`,
    study.background === "Bg3" && `bg-[url(/src/assets/img/bg-3.jpg)]`,
    study.background === "Bg4" && `bg-[url(/src/assets/img/bg-4.jpg)]`
  );

  const ownerNameClassName = cx(
    study.background === "green" && "text-green-text",
    study.background === "yellow" && "text-yellow-text",
    study.background === "blue" && "text-blue-text",
    study.background === "pink" && "text-pink-text",
    theme === "dark" && "text-white"
  );

  return (
    <Link
      to={`/studies/${study.id}`}
      data-theme={theme}
      className="group block w-[357px] h-[243px] relative border-black/10 border rounded-[20px]"
    >
      {imgClassName && (
        <img
          className={cx(
            "rounded-[20px] absolute h-full w-full bg-cover",
            imgClassName
          )}
        />
      )}

      <article
        className={cx(
          "p-[30px] rounded-[20px] h-full w-full",
          colorClassName,
          "group-data-[theme=dark]:backdrop-brightness-[45%]"
        )}
      >
        <header>
          <div className="flex items-center justify-between">
            <h6 className="text-lg font-bold">
              <span className={cx("mr-0.5", ownerNameClassName)}>
                {study.ownerName}
              </span>
              <span
                className={cx(
                  theme === "dark" ? "text-white" : "text-black-414141"
                )}
              >
                의 {study.name}
              </span>
            </h6>

            <Tag theme={theme} type={"point"} value={310} />
          </div>

          <span
            className={cx(
              "mt-2.5 inline-block text-sm text-gray-818181 group-data-[theme=dark]:text-white"
            )}
          >
            {startFrom}일째 진행 중
          </span>
        </header>

        <p
          className={cx(
            "mt-[30px] text-gray-414141 group-data-[theme=dark]:text-white"
          )}
        >
          {study.description}
        </p>
      </article>
    </Link>
  );
}

export default StudyCard;
