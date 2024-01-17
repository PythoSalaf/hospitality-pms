import React from "react";
import PageTitle, { PageTitleProps } from "./PageTitle";

type PageHeaderProps = { title: PageTitleProps; actions?: React.ReactNode[] };

/**
 * PageHeader component for rendering a flexible header with a title and optional actions.
 * @param title - Title configuration for the page header.
 * @param actions - List of action elements to be displayed in the header.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ title, actions }) => {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row justify-between w-full my-6 lg:my-8`}
    >
      <PageTitle {...title} />
      <div className={`flex  gap-4`}>
        {actions?.map((action, i) => (
          <>{action}</>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
