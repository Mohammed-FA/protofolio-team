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
import ButtonLoading from "@/components/Comment/ButtonLoading";
import { useSignup } from "@/api/hooks/useAuth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import AuthHeader from "@/components/Comment/AuthHeader";

const FormSchema = z
  .object({
    fullname: z.string().min(1, "fullname is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
    image: z.instanceof(File).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignUpPage() {
  const router = useRouter();
  const signupMutation = useSignup();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });



  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append("Email", values.email);
    formData.append("FullName", values.fullname);
    formData.append("Password", values.password);
    formData.append("ConfirmPass", values.confirmPassword);
    if (values.image) {
      formData.append("imageurl", values.image);
    }

    await toast.promise(
      signupMutation.mutateAsync(formData),
      {
        loading: "Creating your account...",
        success: () => {
          router.push("/check-email");
          return "A verification email has been sent!";
        },
        error: (err) => {
          const errorAxios = err as AxiosError;

          if (errorAxios.response?.data) {
            return typeof errorAxios.response.data === "string"
              ? errorAxios.response.data
              : JSON.stringify(errorAxios.response.data);
          }

          return errorAxios.message || "Something went wrong";
        },
      }
    );
  };

  const renderField = (name: "fullname" | "email" | "password" | "confirmPassword", label: string, type = "text") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-black">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              className="border-gray-200 text-black"
              placeholder={label}
              autoComplete={name === "password" || name === "confirmPassword" ? "new-password" : name}
              disabled={signupMutation.isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    < >

      <AuthHeader text="Sign up to create your projects" />


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderField("fullname", "FullName")}
          {renderField("email", "Email", "email")}
          {renderField("password", "Password", "password")}
          {renderField("confirmPassword", "Confirm Password", "password")}
          <ButtonLoading disabled={signupMutation.isPending || form.formState.isSubmitting}>
            Sign Up
          </ButtonLoading>
        </form>
      </Form>

      <div className="my-4 flex items-center justify-evenly before:h-px  before:bg-stone-400 after:h-px  after:bg-stone-400 text-gray-400">
        OR
      </div>

      <div className="flex flex-col gap-2">
        <SocialSignButton onClick={() => signIn("facebook")}>
          Sign up with Facebook
        </SocialSignButton>

        <SocialSignButton onClick={() => signIn("google")}>
          Sign up with Google
        </SocialSignButton>
      </div>

      <div className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </div>
    </>
  );
}
