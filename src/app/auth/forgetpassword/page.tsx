"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { AxiosError } from "axios";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Comment/Logo";
import ButtonLoading from "@/components/Comment/ButtonLoading";
import { useForgetPassword } from "@/api/hooks/useAuth";
import { toast } from "sonner";
import { useState } from "react";

const ForgetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

export default function ForgetPasswordPage() {
  const forgetPasswordMutation = useForgetPassword();

  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: { email: "" },
  });

  const [successfullymessage, setSuccessfullymessage] = useState<string>("")
  const onSubmit = async (values: z.infer<typeof ForgetPasswordSchema>) => {
    await toast.promise(
      forgetPasswordMutation.mutateAsync(values.email),
      {
        loading: "Sending reset email...",
        success: () => {
          setSuccessfullymessage("Check Your Email")
          return "Check Your Email";
        },
        error: (err) => {
          const axiosErr = err as AxiosError;

          if (axiosErr.response?.data) {
            return typeof axiosErr.response.data === "string" ? axiosErr.response.data
              : JSON.stringify(axiosErr.response.data);
          }

          return axiosErr.message || "Something went wrong";
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h2 className="text-sm font-normal my-4 text-gray-700 text-center">
            Enter your email to receive a verification code
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {successfullymessage && <p className="text-center text-sm " style={{ color: "green" }}>
              {successfullymessage}
            </p>}
            {forgetPasswordMutation.isError && (
              <p className="text-center text-sm" style={{ color: "red" }}>
                {(() => {
                  const error = forgetPasswordMutation.error as AxiosError;
                  if (error.response?.data) {
                    return typeof error.response.data === "string"
                      ? error.response.data
                      : JSON.stringify(error.response.data);
                  }
                  return error.message;
                })()}
              </p>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      disabled={forgetPasswordMutation.isPending}
                      onChange={(e) => {
                        field.onChange(e);
                        forgetPasswordMutation.reset();
                        setSuccessfullymessage("")
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonLoading disabled={forgetPasswordMutation.isPending}>
              {forgetPasswordMutation.isPending ? "Sending..." : "Send"}
            </ButtonLoading>
          </form>
        </Form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Remember password?{" "}
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
