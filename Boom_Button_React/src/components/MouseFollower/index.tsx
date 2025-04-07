"use client";

import { type ChangeEvent, useState, useCallback } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [listenerEnabled, setListenerEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isBlue, setIsBlue] = useState(false);
  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const bindMouseListener = () => {
    if (listenerEnabled) {
      setListenerEnabled(false);
      window.removeEventListener("mousemove", updatePosition);
    } else {
      setListenerEnabled(true);
      window.addEventListener("mousemove", updatePosition);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4">
      {listenerEnabled && (
        <div
          className="h-6 w-6 bg-red-400 fixed rounded-[50%]"
          style={{
            top: position.y,
            left: position.x,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      )}

      <div className="flex flex-col">
        <button
          style={{ border: "1px solid white", padding:"10px"}}
          onClick={bindMouseListener}
        >
          Bind mouse listener
        </button>
        <p>
          Mouse is at location: [{position.x},{position.y}]
        </p>
      </div>
      <div className="flex">
        <label htmlFor="input">Input guy!</label>
        <input
          type="text"
          name="input"
          id="input"
          className="border"
          onChange={onInputChange}
        />
        <p>{inputValue}</p>
      </div>
      <div
        onFocus={() => {
          console.log(
            "random on focus requirement due to accessibility requirements"
          );
        }}
        onMouseOver={() => {
          setIsBlue(true);
        }}
        onBlur={() => {
          "random on blur requirement due to accessibility requirements";
        }}
        onMouseOut={() => {
          setIsBlue(false);
        }}
        style={{
          height: "100px",
          width: "100px",
          backgroundColor: isBlue ? "blue" : "green",
        }}
      />
    </div>
  );
};

export default MouseFollower;
