"use client";

import { type ChangeEvent, useState } from "react";

const InputTyper = () => {
  const [outputTyping, setOutputTyping] = useState("");
  const [isFocused, setFocused] = useState(false);

  const handleInputChange = () => {};

  return (
    <div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setOutputTyping(e.target.value);
        }}
        onBlur={() => {
          setFocused(false)
        console.log('focus should be false now!');
        }}
        onFocus={()=> setFocused(true)}
        className={`p-3 text-2xl rounded-md outline-none transition-all ${isFocused ? ' border-2 border-emerald-400' : ' border border-black'}`} 
      > 
      </input>
      <p className="text-emerald-950 text-2xl">
        you typed:{" "}
        <span className="text-emerald-300 font-semibold">{outputTyping}</span>
      </p>
    </div>
  );
};

export default InputTyper;
