"use client";
import { forwardRef, useEffect, useImperativeHandle, useState, useRef } from "react";

const StopWatch = forwardRef((_props, ref) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);

  useImperativeHandle(ref, () => ({
    start,
    reset,
    stop,
  }));

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    setElapsedTime(0);
    startTimeRef.current = 0;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="text-5xl font-mono">{formatTime()}</div>
    </div>
  );
});

StopWatch.displayName = "StopWatch";

export default StopWatch;
