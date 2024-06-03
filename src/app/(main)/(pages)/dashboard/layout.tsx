import InfoBar from "@/components/infobar";
import SideBar from "@/components/sidebar/index";
import React from "react";

type Props = { children: React.ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="flex overflow-hidden h-screen">
      <SideBar />
      <div className="w-full">
        <InfoBar />

        {children}
      </div>
    </div>
  );
};

export default Layout;
