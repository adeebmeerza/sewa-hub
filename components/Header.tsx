import { Raleway } from "next/font/google";
import React from "react";
import SearchBox from "./SearchBox";
import CustomButton from "./CustomButton";

import AuthButton from "./auth/auth-button";
import { SearchProvider } from "@/app/contexts/search-context";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

interface Props {
  withSearchBox?: boolean;
}

const Header = ({ withSearchBox = false }: Props) => {
  return (
    <div className="wrapper">
      <div className="container mx-auto flex flex-row gap-8 justify-between items-center">
        <div
          className={`${raleway.className} text-2xl md:text-3xl text-nowrap font-extrabold text-blue-200 my-4`}
        >
          Sewa Hub
        </div>
        {withSearchBox && (
          <SearchProvider>
            <SearchBox />
          </SearchProvider>
        )}
        <div className="flex items-center gap-2">
          <CustomButton
            variant="default"
            className="hidden sm:inline-flex hover:bg-blue-200/10"
          >
            Renter Hub
          </CustomButton>
          <AuthButton variant="default" className="hover:bg-blue-200/10">
            Login/Signup
          </AuthButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
