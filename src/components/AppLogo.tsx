import Image from "next/image";
import React from "react";
import { LendQrLogo } from "~~/assets";

/**
+ * Renders the AppLogo component.
+ *
+ * @param {object} props - The component props.
+ * @param {object} props.image - The image props.
+ * @param {number} props.image.height - The height of the image.
+ * @param {number} props.image.width - The width of the image.
+ * @param {string} props.image.alt - The alt text for the image.
+ * @param {string} props.image.src - The source URL of the image.
+ * @param {string} props.image.className - The class name for the image.
+ * @param {object} props.text - The text props.
+ * @param {string} props.text.value - The value of the text.
+ * @param {string} props.text.className - The class name for the text.
+ * @return {JSX.Element} The rendered AppLogo component.
+ */

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
