import React from "react";
import { DBCards } from "./DBCard";

const DBContainer: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 items-stretch">
      <DBCards />
    </div>
  );
};

export default DBContainer;
