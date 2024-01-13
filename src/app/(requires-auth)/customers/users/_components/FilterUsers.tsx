import React from "react";
import { FilterResultIcon } from "~~/components/icons";
import { Button } from "~~/components/ui/button";
import { TUserFilter } from "../_types";

const FilterUsers: React.FC<{
  handleSave: (props?: TUserFilter) => void;
  filterValues?: TUserFilter;
}> = () => {
  return (
    <Button variant={`ghost`} size={`icon`}>
      <FilterResultIcon />
    </Button>
  );
};

export default FilterUsers;
