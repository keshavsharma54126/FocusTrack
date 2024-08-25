import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

const red = "#f54e4e";
const green = "#4aec8c";

const Timer: React.FC = () => {
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const secondsLeftRef = useRef<number>(secondsLeft);
  const isPausedRef = useRef<boolean>(isPaused);
  const modeRef = useRef<"work" | "break">(mode);

  function tick(): void {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode(): void {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work" ? workMinutes : breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [workMinutes, breakMinutes]);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds: string | number = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="bg-gray-500 text-black p-6 flex flex-col justify-center items-center gap-6 h- max-h-screen ">
      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255,255,255,0.2)",
        })}
      />
      <div className="flex flex-col gap-6 w-full ">
        <Button
          className="bg-transparent text-white p-2"
          onClick={() => {
            setIsPaused(!isPaused);
            isPausedRef.current = !isPaused;
          }}>
          {isPaused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-14">
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-14">
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Button>

        <div className="flex gap-2">
          <Label className="text-white text-lg">
            Work minutes ({workMinutes})
          </Label>
          <Slider
            disabled={!isPaused}
            defaultValue={[workMinutes]}
            max={60}
            step={1}
            onValueChange={(value: number[]) => {
              setWorkMinutes(value[0]);
            }}
          />
        </div>

        <div className="flex gap-2">
          <Label className="text-white text-lg">
            Break minutes ({breakMinutes})
          </Label>
          <Slider
            disabled={!isPaused}
            defaultValue={[breakMinutes]}
            max={30}
            step={1}
            onValueChange={(value: number[]) => {
              setBreakMinutes(value[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Timer;
