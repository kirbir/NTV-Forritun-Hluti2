"use client";
import Image from "next/image";
import { Sections } from "../data/sections";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-10 pt-10">
      <header className="flex flex-col justify-center p-6 items-center rounded-t-3xl bg-blue-500 border-1">
        <Image
          className="rounded-full mb-4 relative -top-10 border-4 border-solid border-amber-600"
          src="/birkirvPortrait.jpg"
          width="200"
          height="200"
          alt=""
        />
        <h1 className="text-3xl">{Sections[0].header.title}</h1>
        <h2 className="text-xl">{Sections[0].header.subTitle}</h2>
      </header>
      {/* Contact Info*/}
      <section className="flex flex-row justify-between text-sm p-6 mx-10 flex-nowrap gap-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <h3 className="">Phone: {Sections[1].contact.phone}</h3>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>
          <h3 className="">E-mail: {Sections[1].contact.email}</h3>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
            />
          </svg>
          <h3 className="">Website: {Sections[1].contact.web}</h3>
        </div>
      </section>
      {/* About section*/}
      <section className="flex flex-row gap-4 p-6 bg-blue-500/40">
        <div className="w-[50%]">
          <h2 className="font-extrabold">Um mig</h2>
          <p>{Sections[2].about.text}</p>
        </div>
        {/* Skill section*/}
        <div className="w-[50%]">
          {Sections[6].skills.map((skill) => (
            <div key={skill.skillName}>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-lg">{skill.skillName}</span>
                <span className="text-lg">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-blue-500 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 p-6 bg-blue-400">
        <ul className="flex gap-5">
          {Sections[3].reynsla.companies.map((company, index) => (
            <li key={index}>
              <h2 className="text-lg font-bold">
                {company.companyName}
                <span> - </span>
                <span className="font-extralight">{company.year}</span>
              </h2>
              <h4>{company.jobTitle}</h4>
              <p className="text-base text-blue-950">{company.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-row justify-center gap-4 p-6 bg-blue-300">
        <ul className="flex gap-5">
          {Sections[4].menntun.map((school, index) => (
            <li key={index}>
              <h2 className="text-lg font-bold">{school.namsbraut}</h2>
              <span> - </span>
              <span>{school.year}</span>
              <p>{school.skoli}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* Skill Chips*/}
      <section className="flex flex-row p-10 gap-4">
        {Sections[5].strengths.map((d, index) => (
          <p
            key={index}
            className="inline-block px-2 py-1 border-1 border-amber-100 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:bg-amber-400/30"
          >
            {d.strengthName}
          </p>
        ))}
      </section>
    </div>
  );
};

export default Home;
