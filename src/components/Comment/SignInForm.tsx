"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
// import GoogleSignInButton from "../GoogleSignInButton";
// import FacebookSignInButton from "../FacebookSignInButton";
import SignInButton from "./SignInButton";
import Logo from "./Logo";

interface SignInFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  type: string;
}

// Validation Schema
const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
});

const SignInForm = ({ isOpen, onClose, type }: SignInFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/projects",
    });

    if (result?.error) {
      if (result.error.startsWith("AUTH_ERROR:")) {
        router.push("/?error=auth_error");
      } else {
        router.push("/?error=general_error");
      }
      return;
    }

    onClose?.();
    // router.push(result.url || "/projects");
  };

  // const handleSocialSignIn = async (provider: "google" | "facebook") => {
  //   await signIn(provider, {
  //     callbackUrl: "/projects",
  //   });
  // };

  if (!isOpen) return null;

  return (
    <>
      {type === "signin" && (
        <Form {...form}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
              <button
                onClick={onClose}
                className="float-right text-2xl font-bold text-red-600"
              >
                ×
              </button>
              <div className="justify-center items-center flex flex-col">
                <Logo />
                <h2 className="text-sm font-normal my-4 text-charcoalGray">
                  Log in to view your own projects
                </h2>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="mail@example.com" {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SignInButton disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Loading..." : "Sign In"}
                </SignInButton>
              </form>

              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-gray-400">
                OR
              </div>

              {/* <GoogleSignInButton onClick={() => handleSocialSignIn("google")}>
                Sign In with Google
              </GoogleSignInButton>
              <FacebookSignInButton onClick={() => handleSocialSignIn("facebook")}>
                Sign In with Facebook
              </FacebookSignInButton> */}
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export default SignInForm;