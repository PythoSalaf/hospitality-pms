import React from "react";
export type PageTitleProps = { text: string };

/**
 * PageTitle component for rendering a title in the page header.
 * @param text - The text content of the page title.
 */
const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return (
    <h2 className="text-primary text-3xl lg:text-3xl font-medium">{text}</h2>
  );
};

export default PageTitle;
