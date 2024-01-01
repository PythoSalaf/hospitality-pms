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
    <div className="flex gap-x-4 items-center">
      <Image
        src={image?.src ?? LendQrLogo}
        alt="Logo"
        height={image?.height ?? 25}
        width={image?.width ?? 25}
      />
      <span className={text?.className ?? `text-primary text-3xl font-bold`}>
        {text?.value}
      </span>
    </div>
  );
};

export default AppLogo;
