"use client";
import Image from "next/image";
import { Sections } from "../data/sections";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="max-w-screen-lg mx-auto px-10 pt-10 overflow-hidden shadow-2xl">
      <header className="relative flex flex-col justify-center pb-35 pt-10 items-center rounded-t-3xl bg-gradient-to-r  from-teal-800 to-teal-600 border-1">
        <h1 className="text-transparent font-extrabold font-roboto inline-block bg-clip-text bg-gradient-to-r from-emerald-200 via-orange-200 to-teal-300 text-3xl">
          {Sections[0].header.title}
        </h1>
        <h2 className="text-xl">{Sections[0].header.subTitle}</h2>
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-48 md:h-48">
          <div className="w-full h-full rounded-full p-1.5 bg-gradient-to-r from-teal-200 via-orange-200 to-teal-700 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
              <Image
                src="/birkirVportrait.jpg"
                width="150"
                height="150"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>
      {/* Contact Info*/}
      <section className="flex flex-col justify-between text-zinc-800 bg-zinc-100 text-sm p-6  flex-nowrap ">
        <div className="flex flex-row justify-center items-end gap-10 pt-22">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-col justify-center border-2 border-teal-700 border-solid items-center h-10 w-10  rounded-full bg-gradient-to-bl from-orange-200 via-orange-50 to-teal-200">
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
            </div>
            <a href="tel:7908585"><h3 className="hover:underline decoration-orange-300 decoration-2 hover:scale-105">{Sections[1].contact.phone}</h3></a>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-col justify-center border-2 border-teal-700 border-solid items-center h-10 w-10  rounded-full bg-gradient-to-bl from-orange-200 via-orange-50 to-teal-200">
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
            </div>
            <a href="mailto:birkirvr@gmail.com"><h3 className="hover:underline decoration-orange-300 decoration-2 hover:scale-105">{Sections[1].contact.email}</h3></a>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-col justify-center border-2 border-teal-700 border-solid items-center h-10 w-10  rounded-full bg-gradient-to-bl from-orange-200 via-orange-50 to-teal-200">
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
            </div>
            <a href="github.com/kirbir"><h3 className="hover:underline decoration-orange-200 decoration-2 hover:scale-105">{Sections[1].contact.web}</h3></a>
          </div>
        </div>
      </section>

      {/* About section*/}
      <section className="flex flex-col md:flex-row gap-4 p-6 bg-zinc-100 text-white ">
        <div className="w-[100%] md:w-[50%] border-0 rounded-3xl bg-teal-600 p-5 shadow-2xl transform transition-transform hover:scale-103">
          <h2 className=" font-geist font-medium text-xl">About</h2>
          <div className="h-1 w-full mb-4 bg-gradient-to-r from-teal-100 to via-orange-200 to-teal-600"></div>
          <p>{Sections[2].about.text}</p>
        </div>
        {/* Skill section*/}
        <div className="w-[100%] transform transition-transform hover:scale-103 md:w-[50%] bg-white shadow-2xl text-zinc-800 p-5 rounded-3xl">
          {Sections[6].skills.map((skill) => (
            <div key={skill.skillName}>
              <div className="flex justify-between text-sm font-medium font-sans mb-1">
                <span className="text-lg">{skill.skillName}</span>
                <span className="text-lg">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <motion.div
                  className="bg-gradient-to-r from-teal-200 via-15% to-teal-700 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Middle section*/}
      <section className=" flex flex-col md:flex-row gap-4 p-6 bg-zinc-100 text-zinc-900 ">
        {/* Skill Chips*/}
        <div className=" md:w-[50%] p-10 gap-4 flex-wrap border-0 rounded-3xl bg-white shadow-2xl hover:scale-103  transition-transform">
        <h1 className=" font-geist font-medium text-xl">Styrkleikar</h1>
        <div className="h-1 w-full bg-gradient-to-r from-teal-100 to via-orange-200 to-orange-100 mb-4"></div>
          {Sections[5].strengths.map((d, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1, // This creates the staggered effect
              }}
              className="text-sm inline-block px-2 py-1 border-1 m-2 border-teal-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:bg-amber-400/30"
            >
              {d.strengthName}
            </motion.p>
          ))}
          <h1 className=" mt-5 font-geist font-medium text-xl">Umsagnaraðilar</h1>
          <div className="h-1 w-full bg-gradient-to-r from-teal-100 to via-orange-200 to-orange-100 mb-4"></div>
          <h2>Davíð Albertsson - Eigandi Ayurveda ehf</h2>
          <h2 className="border-b-2 border-zinc-200 border-dashed mb-4 pb-4">Sími: 777-3434 | david@pureshilajit.is</h2>
          <h2>Arnar Snæbjörnsson - Eigandi Ayurveda ehf</h2>
          <h2>Sími: 777-3434 | arnar@pureshilajit.is</h2>
        
        </div>
          {/* Education*/}
        <div className="flex flex-row justify-center gap-4 transform transition-transform hover:scale-103 md:w-[50%] bg-white shadow-2xl text-zinc-800 p-5 rounded-3xl sha">
        <ul className="flex flex-col gap-5 ">
          {Sections[4].menntun.map((school, index) => (
            <li key={index}>
              <h2 className="text-lg font-bold">{school.namsbraut}</h2>
              <div className="h-1 w-full bg-gradient-to-r from-teal-100 to via-orange-200 to-orange-100"></div>
              <span> - </span>
              <span>{school.year}</span>
              <p>{school.skoli}</p>
            </li>
          ))}
        </ul>
      </div>

      </section>
      {/* Vinnustaðir */}
      <section className="flex flex-col gap-4 p-6 bg-zinc-100 text-zinc-800">
        <ul className="flex flex-col gap-5">
          {Sections[3].reynsla.companies.map((company, index) => (
            <li
              key={index}
              className="border-0 rounded-3xl bg-teal-600 p-5 shadow-2xl transform transition-transform hover:scale-102 text-white"
            >
              <h2 className="text-lg font-bold font-geist">
                {company.companyName}
                <span> • </span>
                <span className="font-extralight">{company.year}</span>
              </h2>
              <div className="h-1 w-full bg-gradient-to-r from-teal-100 to via-orange-200 to-teal-600 mb-4"></div>
              <h4>{company.jobTitle}</h4>
              <p className="text-base text-zinc-900">{company.description}</p>
            </li>
          ))}
        </ul>
      </section>

     
    </div>
  );
};

export default Home;
