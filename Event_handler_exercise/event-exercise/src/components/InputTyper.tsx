"use client";

import { type ChangeEvent, useState } from "react";

const InputTyper = () => {
  const [outputTyping, setOutputTyping] = useState("");
  const [isFocused, setFocused] = useState(false);
  const [keyPressed, setKeyPressed] = useState("");

  return (
    <div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setOutputTyping(e.target.value);
        }}
        onKeyDown={(e) => setKeyPressed(e.key)}
        onBlur={() => {
          setFocused(false);
          console.log("focus should be false now!");
        }}
        onFocus={() => setFocused(true)}
        className={`p-3 text-2xl rounded-md outline-none transition-all ${
          isFocused ? " border-2 border-emerald-400" : " border border-black"
        }`}
      />
      <p className="text-emerald-950 text-2xl">
        you typed:{" "}
        <span className="text-emerald-200 font-semibold">{outputTyping}</span><br></br>
        You just pressed the key:{" "}
        <span className="text-emerald-200 font-semibold">{keyPressed}</span>
      </p>
    </div>
  );
};

export default InputTyper;
