"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
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
import SignInButton from "@/components/Comment/SignInButton";
import SocialSignButton from "@/components/Comment/SocialSignButton";
import Logo from "@/components/Comment/Logo";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");
    if (error) console.error("SignUp error:", error);
    if (message) console.log("Info message:", message);
  }, [searchParams]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          name: values.username,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration failed");

      // بعد التسجيل، تسجيل الدخول مباشرة
      const signInResult = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/projects",
      });

      if (signInResult?.ok) {
        router.push("/projects");
        router.refresh();
      } else {
        router.push("/auth/signin?message=Registration successful! Please sign in.");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Registration failed";
      if (message.includes("email") && (message.includes("already") || message.includes("exists"))) {
        form.setError("email", { message: "This email is already registered" });
      }
      console.error("Registration error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (name: "username" | "email" | "password" | "confirmPassword", label: string, type = "text") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={label}
              autoComplete={name === "password" || name === "confirmPassword" ? "new-password" : name}
              disabled={isLoading}
            />
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
            Sign up to create your projects
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderField("username", "Username")}
            {renderField("email", "Email", "email")}
            {renderField("password", "Password", "password")}
            {renderField("confirmPassword", "Confirm Password", "password")}
            <SignInButton disabled={isLoading || form.formState.isSubmitting}>
              {isLoading || form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
            </SignInButton>
          </form>
        </Form>

        <div className="my-4 flex items-center justify-evenly before:h-px before:flex-grow before:bg-stone-400 after:h-px after:flex-grow after:bg-stone-400 text-gray-400">
          OR
        </div>

        {/* Social SignUp Buttons بدون أيقونات */}
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
          <Link href="/auth/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
