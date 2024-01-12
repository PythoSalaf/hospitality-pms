import React from "react";
export type PageTitleProps = { text: string };
const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return (
    <h2 className="text-primary text-xl md:text-2xl lg:text-3xl font-medium">
      {text}
    </h2>
  );
};

export default PageTitle;
