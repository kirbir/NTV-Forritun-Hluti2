import SHREK_QUOTES from "@/constants/quotes";
import { useState } from "react";

const RandomQuote = () => {
  const [currentQuote, setCurrentQuote] = useState("What are you doing in my swamp?");
  
  const handleButtonClick = () => {
    const randomIndex = Math.floor(Math.random() * SHREK_QUOTES.length);
    console.log(SHREK_QUOTES.length);
    setCurrentQuote(SHREK_QUOTES[randomIndex]);
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="w-200">
          <p className="w-[100%] inline-block text-3xl text-center">"{currentQuote}"</p>
      </div>
      <button className=" bg-emerald-700 text-lg font-extrabold text-black rounded-md w-100 p-5 border-2 border-emerald-100" onClick={handleButtonClick}>
            Click me for a random Shrek Quote!!
          </button>
    </div>
  );
};

export default RandomQuote;
