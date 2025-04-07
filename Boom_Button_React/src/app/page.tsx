"use client";

import Counter from "@/components/Counter";
import MouseFollower from "@/components/MouseFollower";

const Home = () => {

  return (
    <div className="flex flex-col space-y-4 justify-center items-center my-30 ">
      <Counter />
      <MouseFollower/>
     </div>
  );
};

export default Home;
