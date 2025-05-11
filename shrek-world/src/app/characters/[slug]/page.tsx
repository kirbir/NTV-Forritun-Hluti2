"use client";

import { fakeGetUserFunction, type User } from "@/api/api";
import Link from "next/link";
import { useCallback, useEffect, useState, use } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const BlogWithInfo = ({ params }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { slug } = use(params);

  const getSlug = useCallback(async () => {
    try {
      const response = await fakeGetUserFunction(slug);
      if (typeof response === "string") {
        setError(response);
        setUser(null);
      } else {
        setUser(response);
        setError(null);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load user");
      setUser(null);
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

  if (user === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-[80%] p-10">
      <div className="flex flex-col mt-8">
        <div className="flex flex-row">
          <div
            style={{ backgroundImage: `url(${user.image})` }}
            className="w-[50%] h-[250px] text-center text-4xl text-shadow-2xs font-extrabold p-2 bg-[#5dc088] hover:text-black  bg-contain bg-center bg-no-repeat relative"
          ></div>
          <div className=" inset-0 flex items-center justify-center ">
            <h1 className="text-[4rem] text-green-900 font-bold mb-4 font-chicle">
              {user.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col bg-white text-green-950 m-2 rounded-3xl drop-shadow-emerald-950 drop-shadow-md px-6 py-4">
          <div className="flex flex-row justify-evenly">
            <div>
              <p className="text-2xl font-bold">Voice Actor</p>
              <p className="text-md mb-2">{user.voice}</p>
            </div>
            <div>
              <p className="text-2xl font-bold">Species</p>
              <p className="text-md mb-2">{user.species}</p>
            </div>
          </div>
          <p className="mt-4 text-md">
            <span className="float-left text-6xl font-bold mr-2 text-green-900">
                {user.bio.charAt(0)}
            </span>
            {user.bio.slice(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogWithInfo;
