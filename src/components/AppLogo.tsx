import Image from "next/image";
import React from "react";
import {
  DEFAULT_LOGO_ALT,
  DEFAULT_LOGO_HEIGHT,
  DEFAULT_LOGO_URL,
  DEFAULT_LOGO_WIDTH,
} from "~~/constants";

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
  containerClassName?: string;
}> = ({
  text,
  image,
  containerClassName = "flex lg:gap-x-4 gap-x-2 items-center",
}) => {
  return (
    <div className={containerClassName}>
      <Image
        src={image?.src ?? DEFAULT_LOGO_URL}
        alt={image?.alt ?? DEFAULT_LOGO_ALT}
        height={image?.height ?? DEFAULT_LOGO_HEIGHT}
        width={image?.width ?? DEFAULT_LOGO_WIDTH}
        style={{ width: "auto" }}
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
