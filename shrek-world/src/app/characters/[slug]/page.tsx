"use client";

import { fakeGetUserFunction, type Character } from "@/api/api";
import Link from "next/link";
import { useCallback, useEffect, useState, use } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

const BlogWithInfo = ({ params }: Props) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { slug } = use(params);
  const searchParams = useSearchParams();
  let bonusInfo = false;

  bonusInfo = searchParams.get("showBonusInfo") === "true";
  console.log(bonusInfo);

  const getSlug = useCallback(async () => {
    try {
      const response = await fakeGetUserFunction(slug);
      if (typeof response === "string") {
        setError(response);
        setCharacter(null);
      } else {
        setCharacter(response);
        setError(null);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load user");
      setCharacter(null);
    }
  }, [slug]);

  useEffect(() => {
    getSlug();
  }, [getSlug]);

  if (error) {
    return (
      <div className="p-20">
        <Link href={"/characters"}>Go back</Link>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (character === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-[80%] p-10">
      <div className="flex flex-col mt-8">
        <div className="flex flex-row">
          <div
            style={{ backgroundImage: `url(${character.image})` }}
            className="w-[50%] h-[250px] text-center text-4xl text-shadow-2xs font-extrabold p-2 bg-[#5dc088] hover:text-black  bg-contain bg-center bg-no-repeat relative"
          ></div>
          <div className=" inset-0 flex items-center justify-center ">
            <h1 className="text-[4rem] text-black font-bold mb-4 font-chicle">
              {character.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col bg-white text-green-950 m-2 rounded-3xl drop-shadow-emerald-950 drop-shadow-md px-6 py-4">
          <div className="flex flex-row justify-evenly">
            <div>
              <p className="text-2xl font-bold">Voice Actor</p>
              <p className="text-md mb-2">{character.voice}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">Species</p>
              <p className="text-md mb-2">{character.species}</p>
            </div>
          </div>
          <p className="mt-4 text-md">
            <span className="float-left text-6xl font-bold mr-2 text-green-900">
              {character.bio.charAt(0)}
            </span>
            {character.bio.slice(1)}
            {character.name === "Shrek" && (
              <button className="text-md font-bold text-white bg-amber-600 p-2 m-2 rounded-4xl">
                <Link href="/characters/shrek/?showBonusInfo=true">
                  Click me for bonus information
                </Link>
              </button>
            )}
          </p>
          {bonusInfo && (
            <div className="text-red-500 font-bold">
              Shrek is actually based on a childrens book from 1990. More than a
              decade before the animated movie was released in theaters, author
              William Steig wrote the childrens book, Shrek! The book had
              similar characters and storylines as the movie, but it didnt
              include as much of the films cynical wit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogWithInfo;
