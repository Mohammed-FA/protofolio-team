// src/app/components/form/SignUpForm.tsx
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

interface SignUpFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  type: string;
}

// Validation Schema
const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// API Services
const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `/api/user/check-email?email=${encodeURIComponent(email)}`
    );

    if (!response.ok) {
      throw new Error("Failed to check email");
    }

    const { exists } = await response.json();
    return exists;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

const registerUser = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<Response> => {
  return fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

// Main Component
const SignUpForm = ({ isOpen, onClose, type }: SignUpFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email || form.formState.errors.email) return;

    const exists = await checkEmailExists(email);
    if (exists) {
      form.setError("email", {
        type: "manual",
        message: "الإيميل موجود بالفعل",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const emailExists = await checkEmailExists(values.email);
      if (emailExists) {
        return; // الخطأ هيتعرض في الهوم
      }

      const response = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Email already exists") {
          router.push("/?error=email_exists");
          return;
        } else {
          throw new Error("فشل التسجيل");
        }
      }

      onClose?.();
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      router.push("/?error=registration_failed");
    }
  };

  // const handleSocialSignIn = async (provider: "google" | "facebook") => {
  //   await signIn(provider, {
  //     callbackUrl: "/",
  //   });
  // };

  if (!isOpen) return null;

  return (
    <>
      {type && (
        <Form {...form}>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md">
              <button
                onClick={onClose}
                className="float-right text-2xl font-bold text-red-600"
                aria-label="Close sign up form"
              >
                ×
              </button>

              <div className="flex flex-col items-center justify-center">
                <Logo />
                <h2 className="text-sm font-normal my-4 text-charcoalGray">
                  Sign up to make your own projects
                </h2>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="johndoe"
                            {...field}
                            autoComplete="username"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="mail@example.com"
                            type="email"
                            {...field}
                            onBlur={handleEmailBlur}
                            autoComplete="email"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                            autoComplete="new-password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <SignInButton disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
                </SignInButton>
              </form>

              <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400 text-gray-400">
                OR
              </div>

              {/* <div className="space-y-3">
                <GoogleSignInButton onClick={() => handleSocialSignIn("google")}>
                  Sign up with Google
                </GoogleSignInButton>
                <FacebookSignInButton onClick={() => handleSocialSignIn("facebook")}>
                  Sign up with Facebook
                </FacebookSignInButton>
              </div> */}
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export default SignUpForm;