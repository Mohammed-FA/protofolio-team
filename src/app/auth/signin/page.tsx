// src/app/auth/signin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import GoogleSignInButton from "@/app/components/GoogleSignInButton";
// import FacebookSignInButton from "@/app/components/FacebookSignInButton";
import SignInButton from "@/components/Comment/SignInButton";
import Logo from "@/components/Comment/Logo";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
});

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error === "CredentialsSignin") {
      // setErrorMessage("Invalid email or password");
    } else if (error === "Configuration") {
      // setErrorMessage("There was a problem with the server configuration");
    } else if (error === "AccessDenied") {
      // setErrorMessage("Access denied. Please check your credentials");
    } else if (error) {
      // setErrorMessage("An authentication error occurred");
    }

    if (message) {
      console.log("Success message:", message);
    }
  }, [searchParams]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      console.log("Attempting to sign in with:", values.email);

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/projects",
      });

      console.log("SignIn result:", result);

      if (result?.error) {
        console.error("SignIn error:", result.error);

        // Handle different types of errors
        switch (result.error) {
          case "CredentialsSignin":
            // setErrorMessage("Invalid email or password");
            break;
          case "Missing email or password":
            // setErrorMessage("Please enter both email and password");
            break;
          case "Invalid email or password":
            // setErrorMessage("Invalid email or password");
            break;
          case "Failed to create user":
            // setErrorMessage("Authentication failed. Please try again");
            break;
          default:
          // setErrorMessage(result.error || "Authentication failed");
        }
        return;
      }

      if (result?.ok) {
        console.log("Sign in successful, redirecting...");

        // Wait a moment for the session to be established
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Verify session was created
        const session = await getSession();
        console.log("Session after signin:", session);

        if (session) {
          router.push(result?.url || "/projects");
          router.refresh();
        } else {
          console.error("Session not established after signin");
          // setErrorMessage("Authentication succeeded but session not created");
        }
      } else {
        console.error("SignIn not successful:", result);
        // setErrorMessage("Authentication failed. Please try again");
      }
    } catch (error) {
      console.error("SignIn exception:", error);
      // setErrorMessage("An unexpected error occurred. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSocialSignIn = async (provider: "google" | "facebook") => {
  //   try {
  //     console.log(`Attempting ${provider} sign in`);
  //     setIsLoading(true);

  //     // const result = await signIn(provider, {
  //     //   callbackUrl: "/projects",
  //     //   redirect: true,
  //     // }

  //     // );
  //   } catch (error) {
  //     console.error(`${provider} signin error:`, error);
  //     setErrorMessage(`Failed to sign in with ${provider}`);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h2 className="text-sm font-normal my-4 text-charcoalGray">
            Log in to view your projects
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: { value: string } }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }: { field: { value: string } }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SignInButton disabled={isLoading || form.formState.isSubmitting}>
              {isLoading || form.formState.isSubmitting
                ? "Loading..."
                : "Sign In"}
            </SignInButton>
            <div className="text-center mt-2">
              <a
                href="/auth/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </Form>

        <div className="my-4 flex items-center justify-evenly before:h-px before:flex-grow before:bg-stone-400 after:h-px after:flex-grow after:bg-stone-400 text-gray-400">
          OR
        </div>

        {/* <div className="space-y-3">
          <GoogleSignInButton
            onClick={() => handleSocialSignIn("google")}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in with Google"}
          </GoogleSignInButton>
          <FacebookSignInButton
            onClick={() => handleSocialSignIn("facebook")}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign in with Facebook"}
          </FacebookSignInButton>
        </div> */}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?
            <a href="/auth/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
