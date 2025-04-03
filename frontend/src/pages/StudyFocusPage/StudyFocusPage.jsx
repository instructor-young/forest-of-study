import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import API from "../../api/index.api";
import PauseIcon from "../../assets/img/icon_pause.png";
import PlayIcon from "../../assets/img/icon_play.png";
import RestartIcon from "../../assets/img/icon_restart.png";
import StopIcon from "../../assets/img/icon_stop.png";
import Page from "../../components/Page";
import Tag from "../../components/Tag";
import { convertMinutesAndSecondsIntoSeconds, convertSecondsIntoMinutesAndSeconds } from "../../utils/functions.utils";
import TodayButton from "../StudyDetailPage/components/TodayButton";

function StudyFocusPage() {
  const { studyId } = useParams();
  const timerIdRef = useRef();
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isPasswordCorrect, setIspasswordCorrect] = useState(false);
  const [study, setStudy] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState("stop"); // 'stop' / 'paused' / 'playing'
  const [targetSeconds, setTargetSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(null);
  const minustesInString =
    currentSeconds === null || currentSeconds >= 0 ? String(minutes).padStart(2, "0") : "-" + String(minutes).padStart(2, "0");
  const secondsInString = String(seconds).padStart(2, "0");
  const navigate = useNavigate();
  const location = useLocation();
  const password = location.state;

  const handleClickTodayHabit = () => navigate(`/studies/${studyId}/habits`, { state: password });
  const handleClickGoToHome = () => navigate(`/studies/${studyId}`);
  const fetchStudy = () => API.studies.getStudy(studyId).then(setStudy);

  const handleChangeSeconds = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return setSeconds(0);

    if (value >= 60) {
      return setSeconds(59);
    }

    setSeconds(value);
  };

  const handleChangeMinutes = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < 0) return setMinutes(0);

    if (value >= 100) {
      return setMinutes(99);
    }

    setMinutes(value);
  };

  const handleClickStart = () => {
    if (minutes === 0 && seconds === 0) return alert("시간을 입력해 주세요");

    setTimerStatus("playing");

    const currentSeconds = convertMinutesAndSecondsIntoSeconds(minutes, seconds);

    setTargetSeconds(currentSeconds);
    setCurrentSeconds(currentSeconds);
  };

  const handleClickPause = () => {
    if (timerStatus === "playing") {
      setTimerStatus("paused");
    } else if (timerStatus === "paused") {
      setTimerStatus("playing");
    }
  };

  const handleClickRestart = () => {
    setTimerStatus("playing");

    setCurrentSeconds(targetSeconds);

    clearInterval(timerIdRef.current);

    timerIdRef.current = setInterval(() => {
      setCurrentSeconds((prev) => prev - 1);
    }, 1000);
  };

  const handleClickStop = async () => {
    setTimerStatus("stop");
    setMinutes(0);
    setSeconds(0);
    setTargetSeconds(null);
    setCurrentSeconds(null);

    await API.studies.finishFocus(studyId, targetSeconds, password);
    await fetchStudy();
  };

  useEffect(() => {
    API.studies.checkStudyPassword(studyId, password).then((result) => {
      setIspasswordCorrect(result);
      setIsPasswordConfirmed(true);
    });
  }, [studyId, password]);

  useEffect(() => {
    if (isPasswordConfirmed && isPasswordCorrect) {
      fetchStudy();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordConfirmed, isPasswordCorrect, studyId]);

  useEffect(() => {
    if (timerStatus === "playing") {
      timerIdRef.current = setInterval(() => {
        setCurrentSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (timerStatus === "puased") {
      clearInterval(timerIdRef.current);
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [timerStatus]);

  useEffect(() => {
    if (currentSeconds !== null) {
      const { minutes, seconds } = convertSecondsIntoMinutesAndSeconds(currentSeconds);

      setMinutes(minutes);
      setSeconds(seconds);
    }
  }, [currentSeconds]);

  if (!isPasswordConfirmed) return "인증 중입니다...";
  if (!isPasswordCorrect) return "잘못된 접근입니다";
  if (!study) return "로딩 중입니다...";

  return (
    <Page>
      <section className="bg-white rounded-[20px] p-10 [&+&]:mt-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-extrabold text-[32px] text-black-414141 flex gap-x-0.5 items-center leading-none">
            <span>{study.ownerName}</span>
            <span>의 {study.name}</span>
          </h1>

          <div className="flex gap-x-4 items-center">
            <TodayButton onClick={handleClickTodayHabit}>오늘의 습관</TodayButton>
            <TodayButton onClick={handleClickGoToHome}>홈</TodayButton>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg text-gray-818181">현재까지 획득한 포인트</h3>
          <Tag theme="light" type="point" value={study.point} size="lg" />
        </div>

        <div className="border border-gray-dddddd rounded-[20px] py-10 px-6 mt-6 flex flex-col items-center">
          <h2 className="text-black-414141 font-extrabold text-2xl mb-[100px]">오늘의 집중</h2>

          <div
            data-is-under-ten={!!targetSeconds && currentSeconds < 10}
            data-is-under-zero={!!targetSeconds && currentSeconds < 0}
            className="font-extrabold text-[150px] text-black-414141 leading-none flex items-center mb-[94px] data-[is-under-ten=true]:text-red-custom data-[is-under-zero=true]:!text-gray-818181"
          >
            <input
              disabled={timerStatus !== "stop"}
              type="number"
              value={minustesInString}
              onChange={handleChangeMinutes}
              className="w-[272px] text-right outline-none"
            />
            <span className="h-[180px]">:</span>
            <input
              disabled={timerStatus !== "stop"}
              type="number"
              value={secondsInString}
              onChange={handleChangeSeconds}
              className="w-[272px] text-left outline-none"
            />
          </div>

          <div className="flex items-center justify-center gap-x-6">
            <button
              data-is-visible={timerStatus !== "stop" && currentSeconds >= 0}
              onClick={handleClickPause}
              className="size-16 bg-[#578246] rounded-full hidden data-[is-visible=true]:flex items-center justify-center hover:brightness-90 active:brightness-75 transition"
            >
              <img src={PauseIcon} className="size-9" />
            </button>

            <button
              data-is-visible={currentSeconds >= 0}
              onClick={handleClickStart}
              disabled={timerStatus !== "stop"}
              className="text-[28px] my-0.5 font-extrabold bg-brand text-white h-[60px] rounded-[50px] w-[320px] hidden data-[is-visible=true]:flex items-center justify-center transition not-disabled:hover:brightness-95 not-disabled:active:brightness-90 disabled:bg-gray-818181 disabled:!cursor-not-allowed"
            >
              <img src={PlayIcon} className="size-10 mr-4" />
              <span className="pr-6">Start!</span>
            </button>

            <button
              data-is-visible={currentSeconds < 0}
              onClick={handleClickStop}
              className="text-[28px] my-0.5 font-extrabold bg-brand text-white h-[60px] rounded-[50px] w-[320px] hidden data-[is-visible=true]:flex items-center justify-center transition not-disabled:hover:brightness-95 not-disabled:active:brightness-90 disabled:bg-gray-818181 disabled:!cursor-not-allowed"
            >
              <img src={StopIcon} className="size-11 mr-4" />
              <span className="pr-6">Stop!</span>
            </button>

            <button
              data-is-visible={timerStatus !== "stop" && currentSeconds >= 0}
              onClick={handleClickRestart}
              className="size-16 bg-brand rounded-full hidden data-[is-visible=true]:flex items-center justify-center hover:brightness-90 active:brightness-75 transition"
            >
              <img src={RestartIcon} className="size-9" />
            </button>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default StudyFocusPage;
