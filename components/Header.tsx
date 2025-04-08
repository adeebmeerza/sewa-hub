import { Raleway } from "next/font/google";
import React from "react";
import SearchBox from "./SearchBox";
import CustomButton from "./CustomButton";

import AuthButton from "./auth/auth-button";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

interface Props {
  withSearchBox?: boolean;
}

const Header = ({ withSearchBox = false }: Props) => {
  return (
    <div className="bg-transparent">
      <div className="container mx-auto flex flex-row gap-8 justify-between items-center">
        <div
          className={`${raleway.className} text-2xl md:text-3xl text-nowrap font-extrabold text-blue-200 my-4`}
        >
          Sewa Hub
        </div>
        {withSearchBox && <SearchBox />}
        <div className="flex items-center gap-2">
          <CustomButton variant="default" className="hidden sm:inline-flex">
            Renter Hub
          </CustomButton>
          <AuthButton variant="default">Login/Signup</AuthButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
