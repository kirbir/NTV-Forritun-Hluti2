"use client";
import Image from "next/image";
import {Sections} from "../data/sections"


const Home = () => {
  const foo = () => <p>hi</p>;
  return (
    <div className="w-full-lg mx-auto px-10">
      <header className="flex flex-col justify-center p-6 items-center rounded-t-3xl bg-blue-500">
        <h1 className="text-3xl">{Sections[0].header.title}</h1>
        <h2 className="text-xl">{Sections[0].header.subTitle}</h2>
      </header>
      <section className="flex flex-row p-6">
      <h3 className="text-3xl">Phone: {Sections[1].contact.phone}</h3>
      <h3 className="text-3xl">E-mail: {Sections[1].contact.email}</h3>
      <h3 className="text-3xl">Website: {Sections[1].contact.web}</h3>
    
      </section>
    </div>
  )
};


export default Home;