import { Raleway } from "next/font/google";
import React from "react";
import { Plus } from "lucide-react";
import SearchBox from "./SearchBox";
import CustomButton from "./CustomButton";

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
          className={`${raleway.className} text-3xl text-wrap font-bold text-blue-100 my-4`}
        >
          Sewa Hub
        </div>
        {withSearchBox && <SearchBox />}
        <div className="flex items-center gap-2">
          <CustomButton variant="link" className="text-primary-foreground">
            Renter Hub
          </CustomButton>
          <CustomButton>My account</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
