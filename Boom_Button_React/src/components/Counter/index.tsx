"use client";

import CounterButton from "./CounterButton";
import { BOOM_MESSAGE } from "@/constants/notifications";
import { useState, useEffect, ChangeEvent } from "react";

type BoomState = {
  hasBoomed: boolean;
};

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(()=> {
    if (typeof window !== 'undefined') {
      const savedStep = localStorage.getItem('stepValue');
      return savedStep ? Number(savedStep) : 10;
    }
  });
  const [limit, setLimit] = useState(()=> {
    if (typeof window !== 'undefined') {
      const savedLimit = localStorage.getItem('limitValue');
      return savedLimit ? Number(savedLimit) : 35;
    }
  });

  const [hasBoomed, setHasBoomed] = useState<BoomState["hasBoomed"]>(false);

  // Save step increment value when changed
  useEffect(() => {localStorage.setItem('stepValue', step!.toString())});
  useEffect(() => {localStorage.setItem('limitValue', limit!.toString())});


  const onPlus = () => {
    if (count >= limit!) {
      window.alert("BOOM! Over 35!");
      setHasBoomed(true);
      return;
    }
    setHasBoomed(false);
    setCount(count + step!);
  };

  const onMinus = () => {
    if (count <= -limit!) {
      setHasBoomed(true);
      window.alert("BOOM! you went under -35!");
      return;
    }
    setHasBoomed(false);
    setCount(count - step!);
  };

  const handleStepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue= Number(e.target.value) || 0;
    setStep(newValue);
   
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-3xl text-red-400">{hasBoomed ? BOOM_MESSAGE : "Welcome - No boom yet"}</p>
      <div className="flex gap-4 mb-4 ">
        <div>
          <label htmlFor="stepInput">Set step number</label>
          <input
            name="stepInput"
            type="number"
            value={step}
            onChange={handleStepChange}
            className="border-2 p-2 rounded text-center w-32 block"
          />
        </div>
        <div >
          <label htmlFor="limitInput">Set BOOM limit</label>
          <input
            name="limitInput"
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value) || 0)}
            className="border-2 p-2 rounded text-center w-32 block"
          />
        </div>
      </div>
      <CounterButton count={count} onPlus={onPlus} onMinus={onMinus} />
    </div>
  );
};

export default Counter;
