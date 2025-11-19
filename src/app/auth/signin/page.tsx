"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SocialSignButton from "@/components/Comment/SocialSignButton";
import Logo from "@/components/Comment/Logo";
import { useAuth } from "@/provider/ClinetInfo";
import ButtonLoading from "@/components/Comment/ButtonLoading";
import { useLogin } from "@/api/hooks/useAuth";
import { AxiosError } from "axios";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export default function SignInPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });
  const { login } = useAuth();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    await toast.promise(
      loginMutation.mutateAsync(values),
      {
        loading: "Signing in...",
        success: (data) => {
          login(data.token);
          router.push("/");
          return `Welcome back, ${data.fullname || "User"}`
        },
        error: (err) => {

          const errorAxios = err as AxiosError;
          if (errorAxios.response?.data) {
            return typeof errorAxios.response.data === "string"
              ? errorAxios.response.data
              : JSON.stringify(errorAxios.response.data);
          }
          return errorAxios.message;
        },
      }
    );

  };

  const renderField = (name: "email" | "password", label: string, type = "text") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <Input className="border-gray-200"  {...field} onChange={(e) => {
              field.onChange(e);
              loginMutation.reset();
            }} type={type} placeholder={label} disabled={loginMutation.isPending} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h2 className="text-sm font-normal my-4 text-gray-700">
            Log in to view your projects
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {loginMutation.isError && (
              <p className="text-center text-sm" style={{ color: "red" }}>
                {(() => {
                  const error = loginMutation.error as AxiosError;
                  if (error.response?.data) {
                    return typeof error.response.data === "string"
                      ? error.response.data
                      : JSON.stringify(error.response.data);
                  }
                  return error.message;
                })()}
              </p>
            )}
            {renderField("email", "Email")}
            {renderField("password", "Password", "password")}
            <ButtonLoading disabled={loginMutation.isPending || form.formState.isSubmitting}>
              Sign In
            </ButtonLoading>
            <div className="text-center mt-2">
              <Link href="/auth/forgetpassword" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </Form>

        <div className="my-4 flex items-center justify-evenly before:h-px  before:bg-stone-400 after:h-px  after:bg-stone-400 text-gray-400">
          OR
        </div>

        <div className="flex flex-col gap-2">
          <SocialSignButton onClick={() => signIn("facebook")}>
            Sign in with Facebook
          </SocialSignButton>

          <SocialSignButton onClick={() => signIn("google")}>
            Sign in with Google
          </SocialSignButton>
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
