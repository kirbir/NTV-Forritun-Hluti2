"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import RandomQuote from "@/components/RandomQuote";
import InputTyper from "@/components/InputTyper";

export default function Home() {
  const [imageScale, setImageScale] = useState(false);

  //  const onImageEnter = (e: ChangeEvent<HTMLImageElement>) => {
  // e.currentTarget.width(Number("33px");
  //  }

  return (
    <div className="flex flex-col bg-emerald-500/80 text-white items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        alt="nice image of mister shrek, the green cartoon figure"
        className={imageScale ? "scale-125" : "scale-95"}
        src={"/shrek.jpg"}
        width={170}
        height={170}
        style={{ borderRadius: "50%" }}
        onMouseEnter={() => {
          setImageScale(true);
        }}
        onMouseLeave={() => {
          setImageScale(false);
        }}
      />
      <h1 className="text-4xl text-emerald-900">Welcome to Shrek's swamp!</h1>

      <RandomQuote />
      <InputTyper />
    </div>
  );
}
