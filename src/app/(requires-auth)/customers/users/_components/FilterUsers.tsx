"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalenderIcon, FilterResultIcon } from "~~/components/icons";
import { Button } from "~~/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~~/components/ui/form";
import useGetOrganizations from "~~/hooks/useGetOrganizations";
import { TUserFilter } from "../_types";
import { FilterUsersSchema } from "../_schemas";
import { Input } from "~~/components/ui/input";
import { USER_STATUS_OPTIONS } from "../_constants";
import { Dialog, DialogContent, DialogTrigger } from "~~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~~/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "~~/components/ui/calendar";
import { cn } from "~~/lib/utils";

const FilterUsers: React.FC<{
  handleSave: (props?: TUserFilter) => void;
  filterValues?: TUserFilter;
  isActive?: boolean;
}> = ({ handleSave, filterValues, isActive = false }) => {
  const form = useForm<z.infer<typeof FilterUsersSchema>>({
    resolver: zodResolver(FilterUsersSchema),
    values: filterValues ?? {},
  });

  const onSubmit = (values: z.infer<typeof FilterUsersSchema>, e: unknown) => {
    (e as React.FormEvent<HTMLFormElement>).preventDefault();

    handleSave({
      organizationId: values.organizationId,
      date: values.date,
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
      status: values.status,
    });
  };

  const handleReset = () => {
    handleSave(undefined);
    form.reset({
      date: undefined,
      email: "",
      name: "",
      organizationId: undefined,

      phoneNumber: "",
      status: undefined,
    });
  };
  const { data: orgs } = useGetOrganizations();
  return (
    <Dialog>
      {/* <Button variant={`ghost`} size={`icon`}> */}
      <DialogTrigger data-testid="filter-user">
        <FilterResultIcon pathFill={isActive ? "#39CDCC" : undefined} />
      </DialogTrigger>
      {/* </Button> */}
      <DialogContent className={``}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit) as () => void}
            className="space-y-2 font-worksans "
          >
            <FormField
              control={form.control}
              name="organizationId"
              render={({ field }) => (
                <FormItem className={`space-y-1`}>
                  <FormLabel>Organization</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={`h-10`}>
                        <SelectValue placeholder="Select Organization" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent role="select">
                      {orgs?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={`text-xs`} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className={`space-y-1`}>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input role="name" placeholder="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className={`space-y-1`}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className={`flex flex-col gap-y-1`}>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 bg-transparent hover:bg-transparent text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalenderIcon className="ml-auto h-4 w-4" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className={`space-y-1`}>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input role="input" placeholder="Phone Number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className={`space-y-1`}>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={`h-10`}>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {USER_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          <span className={`capitalize`}>{option}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className={`text-xs`} />
                </FormItem>
              )}
            />

            <div className={`flex justify-between gap-2 pt-6`}>
              <Button
                type="button"
                className="w-full"
                variant={`outline`}
                onClick={() => handleReset()}
              >
                Reset
              </Button>
              <Button type="submit" className="w-full">
                Filter
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterUsers;
