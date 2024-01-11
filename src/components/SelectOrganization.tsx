"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~~/components/ui/select";
import useGetOrganizations from "../hooks/useGetOrganizations";
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

export const SelectOrganization: React.FC<IProps<number | string>> = ({
  trigger = (
    <SelectTrigger>
      <SelectValue placeholder="Select organization" />
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

export const OrganizationSelector = () => {
  const { data } = useGetOrganizations();
  const [selected, setSelected] = useState<string>("Switch Organization");
  return (
    <SelectOrganization
      options={data.map((item) => ({ label: item.name, value: item.id }))}
      onValueChange={(val) =>
        setSelected(
          data.find((item) => item.id === val)?.name ?? "Switch Organization"
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
