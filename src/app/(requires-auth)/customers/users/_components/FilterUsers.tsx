"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilterResultIcon } from "~~/components/icons";
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

const FilterUsers: React.FC<{
  handleSave: (props?: TUserFilter) => void;
  filterValues?: TUserFilter;
}> = ({ handleSave, filterValues }) => {
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
      date: "",
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
      <DialogTrigger>
        <FilterResultIcon />
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
                <FormItem className={`space-y-1`}>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Date" {...field} />
                  </FormControl>

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
