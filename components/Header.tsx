import { Raleway } from "next/font/google";
import React from "react";
import { Plus } from "lucide-react";
import SearchBox from "./SearchBox";
import CustomButton from "./CustomButton";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const Header = () => {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto flex flex-row gap-8 justify-between items-start p-4">
        <div
          className={`${raleway.className} text-3xl text-wrap font-bold text-primary-foreground my-4`}
        >
          Sewa Hub
        </div>
        <SearchBox />
        <div className="flex items-center gap-2">
          <CustomButton variant="outline">Login / Sign up</CustomButton>
          <CustomButton icon={<Plus />}>Create listing</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
