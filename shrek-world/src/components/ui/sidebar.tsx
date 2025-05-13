"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fakeGetAllUsers, type Character } from "@/api/api";
import { usePathname, useSearchParams } from "next/navigation";

const Sidebar = () => {
  const [users, setUsers] = useState<Character[] | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Add debug logging
  useEffect(() => {
    console.log("Current pathname:", pathname);
    console.log("Has params:", searchParams.has("showBonusInfo"));
    console.log("showBonusInfo value:", searchParams.get("showBonusInfo"));
  }, [pathname, searchParams]);

  const isActive = (name: string) => {
    // Check both with and without trailing slash
    const isActiveWithoutSlash = pathname === `/characters/${name}`;
    const isActiveWithSlash = pathname === `/characters/${name}/`;
    
    return (isActiveWithoutSlash || isActiveWithSlash)
      ? "text-green-200 text-3xl border-l-2 border-green-800 p-2 text-shadow-[0_0_4px_#000]"
      : "text-green-200 text-3xl text-shadow-[0_0_2px_#000]";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fakeGetAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!users) {
    return <div className="p-4 ">Loading characters...</div>;
  }

  return (
    <div className="p-4 mt-10">
      <h2 className="text-3xl font-bold mb-4 text-green-800 font-chicle">
        Characters
      </h2>
      {users.map((character) => (
        <div key={character.id} className="mb-2 p-2 ">
          <Link href={`/characters/${character.name}`} className="text-green-950 ">
            <p className={`font-bold ${isActive(character.name)}`}>{character.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
