"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader } from "../ui/card";
import Header from "./header";
import { LoginSchema, LoginValues } from "@/schemas/auth-schema";
import { login } from "@/server/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { LoadingButton } from "../loading-button";

const LoginForm = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (values: LoginValues) => {
    startTransition(() => {
      login(values, callbackUrl).then((res) => {
        if (res?.error) {
          return toast.success(res.error || urlError, {
            position: "bottom-left",
          });
        }

        if (res?.success) {
          reset();
          toast.success(res.success, {
            position: "bottom-left",
          });
        }
      });
    });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Card className="w-full rounded-3xl border-none shadow-6">
      <CardHeader>
        <Header label="Welcome Back" />
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                name="email"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        variant="default"
                        size="default"
                        className={cn(
                          "bg-gray-50 text-foreground focus:border-violet-600 focus:bg-gray-100",
                          errors.email &&
                            "bg-destructive/10 focus:border-destructive focus:bg-destructive-foreground",
                        )}
                        placeholder="Enter your email address"
                        {...field}
                        onBlur={field.onBlur}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormLabel
                      className={cn(
                        "peer-focus:text-violetborder-violet-600 text-foreground",
                        errors.email &&
                          "text-destructive peer-focus:text-destructive",
                      )}
                    >
                      <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                        Email
                      </span>
                    </FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <div className="relative grid grid-flow-col grid-cols-2 gap-0">
                      <FormControl>
                        <Input
                          variant="default"
                          size="default"
                          type={passwordShown ? "text" : "password"}
                          className={cn(
                            "col-span-2 flex-1 bg-gray-50 text-foreground focus:border-primary-violet focus:bg-gray-100",
                            errors.password &&
                              "bg-destructive/10 focus:border-destructive focus:bg-destructive-foreground",
                          )}
                          placeholder="••••••••"
                          {...field}
                          onBlur={field.onBlur}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormLabel
                        className={cn(
                          "text-foreground peer-focus:text-primary-violet",
                          errors.password &&
                            "text-destructive peer-focus:text-destructive",
                        )}
                      >
                        <span className="block after:ml-1 after:text-red-500 after:content-['*']">
                          Password
                        </span>
                      </FormLabel>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          name="passwordShown"
                          type="button"
                          aria-label="toggle password visibility"
                          onClick={togglePassword}
                        >
                          {passwordShown ? (
                            <Eye className="h-5 w-5 stroke-gray-600" />
                          ) : (
                            <EyeOff className="h-5 w-5 stroke-gray-600" />
                          )}
                          <span className="sr-only">Pasword Shown</span>
                        </button>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pb-1">
              <LoadingButton
                variant="custom_primary"
                size="default"
                loading={isPending}
                type="submit"
                className="w-full font-semibold"
                loadingType="submit"
              >
                Login
              </LoadingButton>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
