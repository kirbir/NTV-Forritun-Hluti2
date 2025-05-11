"use client";

import { fakeGetAllUsers, type User } from "@/api/api";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

const Blog = () => {
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
		<div className="p-20">
			<p>Welcome to my blog page</p>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Shrek World</h1>
        <div className="flex flex-row gap-4 w-screen justify-center items-center">
          <div className="w-[30%] bg-red-500 h-screen rounded-lg bg-[url('/shrek.png')] bg-cover bg-center bg-no-repeat">
          <div className="w-[30%] bg-blue-500 h-screen rounded-lg">"use client";

            import Link from "next/link";


            return (
            <div className="p-20">
              <p>Welcome to the Home page</p>
              <Link className="border border-red-500" href={"/shrek"}>
                Go to blog
              </Link>
            </div>



            export default Home;</div>
          <div className="w-[30%] bg-green-500 h-screen rounded-lg">Shrek3</div>
        </div>
      </main>
    </div>
			{users.map((user) => (
				<div key={user.id} className="m-16 border border-red-500">
					<p>{user.name}</p>
					<p>User bio: {user.bio}</p>
					<p>Location: {user.location}</p>
					<p>id: {user.id}</p>
					<Link href={`/blog/${user.id}`} className="border border-blue-600">
						<p>Go to page for this user!</p>
					</Link>
				</div>
			))}
		</div>
	);
};

export default Blog;