"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "~~/components/ui/form";
import { Input } from "~~/components/ui/input";

import { LoginSchema } from "../_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~~/components/ui/button";
import Link from "next/link";
import { appRoutes } from "~~/routes";

const LoginForm: React.FC<{
  onSubmit: (values: z.infer<typeof LoginSchema>) => void;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading: isPending }) => {
  const _form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPwd, setShowPwd] = useState(false);
  return (
    <Form {..._form}>
      <form
        onSubmit={_form.handleSubmit(onSubmit)}
        role="form"
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={_form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Email"
                    type="email"
                    role="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={_form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Password"
                    type={showPwd ? "text" : "password"}
                    isPassword
                    onShowPassword={() => setShowPwd((val) => !val)}
                    role="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Link href={appRoutes.forgotPassword}>
              <button className="uppercase text-xs text-highlight">
                Forgot PASSWORD?
              </button>
            </Link>
          </div>
        </div>

        <Button loading={isPending} type="submit" className="w-full uppercase">
          Log in
        </Button>
      </form>{" "}
    </Form>
  );
};

export default LoginForm;
