import React from "react";
import { Button } from "~~/components/ui/button";

const ActivateUser = () => {
  return (
    <Button
      variant={"outline"}
      className={`border-highlight text-highlight uppercase text-xs font-semibold bg-transparent hover:bg-transparent hover:border-black tracking-wider`}
      // size={`sm`}
    >
      Activate User
    </Button>
  );
};

export default ActivateUser;
