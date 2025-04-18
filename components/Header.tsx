import { Raleway } from "next/font/google";
import React from "react";
import SearchBox from "./SearchBox";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import SearchProvider from "./search-box/search-provider";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

interface Props {
  isHomepage?: boolean;
  isMobile?: boolean;
}

const Header = ({ isHomepage = false }: Props) => {
  return (
    <div className="bg-primary py-4">
      <div className="wrapper flex flex-col gap-4">
        <div
          className={cn(
            "flex flex-row justify-between items-center",
            isHomepage ? "" : "lg:items-start gap-2"
          )}
        >
          <div
            className={`${raleway.className} text-2xl md:text-3xl text-nowrap font-extrabold text-blue-200 lg:h-14 lg:flex lg:items-center mr-6`}
          >
            Sewa Hub
          </div>

          {/* For default and desktop view: search box must in between logo and nav bar */}
          {!isHomepage && (
            <div className="hidden lg:inline-flex lg:flex-grow">
              <SearchProvider>
                <SearchBox />
              </SearchProvider>
            </div>
          )}

          <NavigationMenu className="lg:h-14 ml-0">
            <NavigationMenuList className="flex items-center my-0">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hidden sm:inline-flex bg-transparent text-white hover:bg-blue-200/20 hover:text-white text-xs sm:text-sm"
                  )}
                >
                  Renter Center
                </NavigationMenuLink>
              </Link>

              <Link
                href="/"
                legacyBehavior
                passHref
                // className="hidden sm:inline-block bg-transparent hover:bg-blue-200/10 text-white/90 text-xs sm:text-sm"
              >
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white/90 sm:text-white hover:bg-blue-200/20 hover:text-white text-xs sm:text-sm"
                  )}
                >
                  Login/Signup
                </NavigationMenuLink>
              </Link>
            </NavigationMenuList>
          </NavigationMenu>

          {/* <div className="flex items-center gap-2 lg:h-14 lg:flex lg:items-center">
            <CustomButton
              variant="default"
              className="hidden sm:inline-flex hover:bg-blue-200/10 text-white/90 text-xs sm:text-sm"
            >
              Renter Hub
            </CustomButton>

            <Link
              href={""}
              className="sm:hidden text-[13px] sm:text-sm font-medium tracking-wide text-white"
            >
              Login/Signup
            </Link>

            <AuthButton
              variant="default"
              className="hidden sm:inline-block hover:bg-blue-200/10 text-white/90 text-xs sm:text-sm"
            >
              Login/Signup
            </AuthButton>
          </div> */}
        </div>

        {/* For default and mobile view: search box must below nav bar */}
        {!isHomepage && (
          <div className="lg:hidden">
            <SearchProvider>
              <SearchBox />
            </SearchProvider>
          </div>
        )}

        {/* For homepage and desktop view: don't show search box in header, show in hero */}

        {/* For homepage and mobile view: don't show search box in header, show in hero */}
      </div>
    </div>
  );
};

export default Header;
