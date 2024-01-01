import Image from "next/image";
import React from "react";
import { PabloIcon } from "~~/assets";
import AppLogo from "../../../components/AppLogo";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full flex ">
      <div className="flex-1 flex flex-col justify-center px-4 py-2">
        <div className="ml-8">
          <AppLogo text={{ value: "lendsqr" }} />
        </div>
        <Image
          src={PabloIcon}
          alt="Mascot"
          height={300}
          width={500}
          className="object-contain mix-blend-multiply self-center mt-16"
        />
      </div>
      <div className="flex-1 bg-white">{children}</div>
    </div>
  );
};

export default AuthLayout;
