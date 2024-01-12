import React from "react";
import { Button } from "~~/components/ui/button";

const BlacklistUser = () => {
  return (
    <Button
      variant={"outline"}
      className={`border-destructive text-destructive  uppercase text-xs font-semibold bg-transparent hover:bg-transparent hover:border-black tracking-wider`}
      // size={`sm`}
    >
      Blacklist User
    </Button>
  );
};

export default BlacklistUser;
