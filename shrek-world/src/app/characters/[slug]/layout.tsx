import { Metadata } from "next";
import Sidebar from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Shrek Characters",
  description: "Shrek rules",
};

export default function CharacterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row justify-center items-start bg-[#5dc088] min-h-screen ">
      <div className="container mx-auto flex">
        <div className="w-[20%] pl-10">
          <Sidebar />
        </div>
        <div className="flex-1 px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
