"use client";

import React, { useState, useTransition } from "react";
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

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      console.log(values);
    });
  };
  const [showPwd, setShowPwd] = useState(false);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
            <Link href={appRoutes.register}>
              <button className="uppercase text-xs text-highlight">
                Register
              </button>
            </Link>
          </div>
        </div>

        <Button disabled={isPending} type="submit" className="w-full uppercase">
          Log in
        </Button>
      </form>{" "}
    </Form>
  );
};

export default LoginForm;
