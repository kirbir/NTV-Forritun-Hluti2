"use client";
import Image from "next/image";
import { Sections } from "../data/sections";
import { FC, JSX, useState } from "react";
import { div } from "motion/react-client";

type CounterProps = {
  count: number;
  onClick: () => void;
};

const Counter = ({ count }: CounterProps) => {
  const [, setState] = useState(0);

  const onClick = () => {
    setState((s) => {
      return s+1

    })
    console.log("cliiick");
  };

  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={onClick}>FOO</button>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-w-[395px]">
      <Counter count={10} />
    </div>
  );
};

export default Home;
