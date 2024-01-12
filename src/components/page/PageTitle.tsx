import React from "react";

const PageTitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h2 className="text-primary text-xl md:text-2xl lg:text-3xl font-medium">
      {text}
    </h2>
  );
};

export default PageTitle;
