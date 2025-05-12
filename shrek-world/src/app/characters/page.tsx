"use client";

import { fakeGetAllUsers, type User } from "@/api/api";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Characters = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  const getUsers = useCallback(async () => {
    const response = await fakeGetAllUsers();
    setUsers(response);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (!users) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 overflow-hidden">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-4 w-screen justify-center items-center">
          <Link
            href={`/characters/${users[0].name}`}
            className="w-[30%] text-center text-4xl text-shadow-2xs font-extrabold p-2 bg-[#5dc088] hover:bg-green-600 hover:-translate-y-5 h-[70vh] rounded-full bg-[url('/shrek.png')] bg-contain bg-center bg-no-repeat"
          >
            <div className="relative h-full">
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-800/40 py-2 px-6 rounded-4xl">
                {users[0].name}
              </p>
            </div>
          </Link>
          <Link
            href={`/characters/${users[1].name}`}
            className="w-[30%] text-center text-4xl text-shadow-2xs font-extrabold p-2 bg-[5dc088] hover:bg-amber-300 hover:-translate-y-5 h-[70vh] rounded-full bg-[url('/fiona.png')] bg-contain bg-center bg-no-repeat"
          >
            <div className="relative h-full">
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-800/40 py-2 px-6 rounded-4xl">
                {users[1].name}
              </p>
            </div>
          </Link>
          <Link
            href={`/characters/${users[2].name}`}
            className="w-[30%] text-center text-4xl text-shadow-2xs font-extrabold p-2 bg-[5dc088] hover:bg-orange-300 hover:-translate-y-5 h-[70vh] rounded-full bg-[url('/puss.png')] bg-contain bg-center bg-no-repeat"
          >
            <div className="relative h-full">
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-800/40 py-2 px-6 rounded-4xl">
                {users[2].name}
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Characters;
