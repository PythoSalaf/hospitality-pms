"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~~/components/ui/select";
import { useState } from "react";
import BriefcaseIcon from "./icons/BriefcaseIcon";

interface IProps<T> {
  trigger?: React.ReactNode;
  onValueChange?: (val: T) => void;
  defaultValue?: T;
  options?: {
    label: string;
    value: T;
  }[];
}

export const SelectRole: React.FC<IProps<number | string>> = ({
  trigger = (
    <SelectTrigger>
      <SelectValue placeholder="Select Role" />
    </SelectTrigger>
  ),
  onValueChange,
  defaultValue,
  options,
}) => {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={defaultValue?.toString()}
    >
      {trigger}
      <SelectContent role="select">
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const RoleSelector = () => {
  const data = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Staff" },
    { id: 3, name: "Customer" },
  ];
  const [selected, setSelected] = useState<string>("Switch Role");
  return (
    <SelectRole
      options={data.map((item) => ({ label: item.name, value: item.name }))}
      onValueChange={(val) =>
        setSelected(
          data.find((item) => item.name === val)?.name ?? "Switch Role"
        )
      }
      trigger={
        <SelectTrigger
          className={`bg-transparent border-none outline-none focus:ring-0 focus:ring-offset-0 flex justify-start`}
        >
          <div className=" flex justify-start items-center font-normal mr-2">
            <BriefcaseIcon className="mr-2 relative h-4 w-4" />
            <span
              className={`text-primary font-worksans whitespace-nowrap text-base`}
            >
              {selected}
            </span>
          </div>
        </SelectTrigger>
      }
    />
  );
};
