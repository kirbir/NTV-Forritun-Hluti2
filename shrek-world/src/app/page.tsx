import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center">
    <p className="text-4xl mt-10 ">Welcome to Shreks World info page</p>
    <Image 
        src={'/intro.png'} 
        alt={'shrek photo'} 
        width={300} 
        height={50}
        className="animate-bounce hover:animate-none transition-all duration-300 hover:scale-110"
    />
    <Link href={'/characters'}><button className="p-5 cursor-pointer bg-green-700 hover:bg-green-800 text-2xl rounded-2xl font-extrabold ">Explore Characters</button></Link>
    </div>
  );
}
