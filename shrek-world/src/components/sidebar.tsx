"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fakeGetAllUsers, type User } from "@/api/api";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const pathname = usePathname();

  const isActive = (name: string) => {
    return pathname === `/characters/${name}`
      ? "text-green-200 border-l-2 border-green-800 p-2"
      : "text-green-200";
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
      {users.map((user) => (
        <div key={user.id} className="mb-2 p-2 ">
          <Link href={`/characters/${user.name}`} className="text-green-950">
            <p className={`font-bold ${isActive(user.name)}`}>{user.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
