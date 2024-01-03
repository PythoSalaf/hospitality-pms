import Image from "next/image";
import React from "react";
import { LendQrLogo } from "~~/assets";

const AppLogo: React.FC<{
  image?: {
    height?: number;
    width?: number;
    alt?: string;
    src?: string;
    className?: string;
  };
  text?: {
    value?: string;
    className?: string;
  };
}> = ({ text, image }) => {
  return (
    <div className="flex lg:gap-x-4 gap-x-2 items-center">
      <Image
        src={image?.src ?? LendQrLogo}
        alt={image?.alt ?? "logo"}
        height={image?.height ?? 25}
        width={image?.width ?? 25}
      />
      <span
        className={
          text?.className ?? `text-primary text-xl lg:text-3xl font-semibold`
        }
      >
        {text?.value}
      </span>
    </div>
  );
};
export default AppLogo;
