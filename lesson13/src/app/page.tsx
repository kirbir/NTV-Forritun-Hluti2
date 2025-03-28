"use client";
import Image from "next/image";
import { Sections } from "../data/sections";

const Home = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-10 pt-10">
      <header className="flex flex-col justify-center p-6 items-center rounded-t-3xl bg-blue-500">
        <Image
          className="rounded-full mb-4 "
          src="/shrek.jpg"
          width="100"
          height="100"
          alt=""
        />
        <h1 className="text-3xl">{Sections[0].header.title}</h1>
        <h2 className="text-xl">{Sections[0].header.subTitle}</h2>
      </header>

      <section className="flex flex-row justify-between text-sm p-6 mx-10 flex-nowrap gap-4">
        <h3 className="">Phone: {Sections[1].contact.phone}</h3>
        <h3 className="">E-mail: {Sections[1].contact.email}</h3>
        <h3 className="">Website: {Sections[1].contact.web}</h3>
      </section>

      <section className="flex flex-col p-6 bg-blue-500">
        <h2 className="font-extrabold">Um mig</h2>
        <p>{Sections[2].about.text}</p>
      </section>

      <section className="flex flex-col gap-4 p-6 bg-blue-400">
        <ul className="flex gap-5">
          {Sections[3].reynsla.companies.map((company, index) => (
            <li key={index}>
              <h2 className="text-lg font-bold">{company.companyName}<span> - </span><span className="font-extralight">{company.year}</span></h2>
              <h4>{company.jobTitle}</h4>
              <p className="text-base text-blue-950">{company.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-row justify-center gap-4 p-6 bg-blue-300">
        <ul className="flex gap-5">
          {Sections[4].menntun.map((school,index) => (
            <li key={index}>
            <h2 className="text-lg font-bold">{school.namsbraut}</h2><span> - </span><span>{school.year}</span>
            <p>{school.skoli}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* Skill Chips*/}
      <section className="flex flex-row p-10 gap-4">
         {Sections[5].skills.map((d,index) => (
         <p key={index}className="inline-block px-2 py-1 border-1 border-amber-100">
          {d.skillName}
          </p>
        ))}
      </section>
    </div>
  );
};

export default Home;
