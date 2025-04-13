"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import Header from "./Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {isHome ? <Header isHomepage={true} /> : <Header />}
      <main>{children}</main>
    </>
  );
};

export default Layout;
