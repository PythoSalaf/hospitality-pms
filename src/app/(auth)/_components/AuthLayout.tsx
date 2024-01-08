import Image from "next/image";
import React from "react";
import { PabloIcon } from "~~/assets";
import AppLogo from "../../../components/AppLogo";
import ENV from "~~/config/enviroment";

export const MASCOT_IMG_URL = PabloIcon;
export const MASCOT_IMG_ALT = "Mascot";
export const AUTH_LAYOUT_MASCOT_CONTAINER_TEST_ID =
  "auth-layout-mascot-container";
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full flex ">
      <div
        className="flex-1 hidden lg:flex flex-col justify-start gap-y-16 px-4 py-2"
        data-testid={AUTH_LAYOUT_MASCOT_CONTAINER_TEST_ID}
      >
        <div className="ml-8 lg:mt-16">
          <AppLogo text={{ value: ENV.APP_NAME }} />
        </div>
        <Image
          src={MASCOT_IMG_URL}
          alt={MASCOT_IMG_ALT}
          height={300}
          width={500}
          className="object-contain w-full mix-blend-multiply  self-center"
        />
      </div>
      <div className="flex-1 bg-white flex justify-center items-center px-4 ">
        <div className="lg:w-[38vw] w-[80vw]">
          <div className="lg:hidden mb-6 flex justify-end">
            <AppLogo
              text={{ value: ENV.APP_NAME }}
              image={{ height: 18, width: 18 }}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
