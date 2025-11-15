"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
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
import Logo from "@/components/Comment/Logo";

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

    if (error === "email_exists") {
      // setErrorMessage("This email is already registered. Please sign in.");
    } else if (error) {
      // setErrorMessage("An error occurred during registration");
    }

    if (message) {
      console.log("Info message:", message);
    }
  }, [searchParams]);

  // Check email using existing API or simple client-side validation
  const checkEmailExists = async (email: string): Promise<boolean> => {
    console.log(email);

    try {
      // يمكن استخدام API بسيط لفحص الإيميل أو تركه للتحقق من الخادم
      return false; // سنتركه للخادم يتحقق عند التسجيل
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const handleEmailBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!email || form.formState.errors.email) return;

    try {
      const exists = await checkEmailExists(email);
      if (exists) {
        form.setError("email", { message: "This email is already registered" });
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);

    try {
      console.log("Attempting to register user:", values.email);

      // استخدام API endpoint الموجود
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          username: values.username,
          name: values.username,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      console.log("Registration successful:", result);

      // إذا نجح التسجيل، المستخدم عنده tokens جاهزة
      if (result.user && result.accessToken) {
        console.log("Registration successful with tokens");

        // يمكن حفظ الـ tokens في localStorage أو استخدامها مباشرة
        // localStorage.setItem('accessToken', result.accessToken);
        // localStorage.setItem('refreshToken', result.refreshToken);

        // أو تسجيل دخول تلقائي باستخدام NextAuth
        console.log("Attempting automatic sign in...");

        const signInResult = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
          callbackUrl: "/projects",
        });

        console.log("Auto sign-in result:", signInResult);

        if (signInResult?.error) {
          console.error("Auto sign-in failed:", signInResult.error);
          router.push(
            "/auth/signin?message=Registration successful! Please sign in."
          );
        } else if (signInResult?.ok) {
          console.log("Auto sign-in successful, redirecting to projects");
          router.push("/projects");
          router.refresh();
        } else {
          router.push(
            "/auth/signin?message=Registration successful! Please sign in."
          );
        }
      } else {
        // في حالة عدم وجود tokens، اعادة توجيه للدخول
        router.push(
          "/auth/signin?message=Registration successful! Please sign in."
        );
      }
    } catch (error: unknown) {
      console.error("Registration error:", error);

      const message =
        error instanceof Error ? error.message : "Registration failed";
      // setErrorMessage(message);

      if (
        message.includes("email") &&
        (message.includes("already") || message.includes("exists"))
      ) {
        form.setError("email", { message: "This email is already registered" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSocialSignIn = async (provider: "google" | "facebook") => {
  //   try {
  //     console.log(`Attempting ${provider} sign up`);
  //     setIsLoading(true);

  //     // const result = await signIn(provider, {
  //     //   callbackUrl: "/projects",
  //     //   redirect: true,
  //     // });

  //     console.log(`${provider} signup result:, result`);
  //   } catch (error) {
  //     console.error(`${provider} signup error:`, error);
  //     setErrorMessage(`Failed to sign up with ${provider}`);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h2 className="text-sm font-normal my-4 text-charcoalGray">
            Sign up to create your projects
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }: { field: { value: string } }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      {...field}
                      autoComplete="username"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }: { field: { value: string } }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      type="email"
                      {...field}
                      onBlur={handleEmailBlur}
                      autoComplete="email"
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
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }: { field: { value: string } }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                      autoComplete="new-password"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SignInButton disabled={isLoading || form.formState.isSubmitting}>
              {isLoading || form.formState.isSubmitting
                ? "Signing Up..."
                : "Sign Up"}
            </SignInButton>
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
            {isLoading ? "Loading..." : "Sign up with Google"}
          </GoogleSignInButton>
          <FacebookSignInButton
            onClick={() => handleSocialSignIn("facebook")}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Sign up with Facebook"}
          </FacebookSignInButton>
        </div> */}

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-500 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// لا نحتاج لإنشاء API endpoints إضافية لأن عندك بالفعل:
// ✅ /api/auth/register - للتسجيل
// ✅ /api/auth/login - لتسجيل الدخول

// مثال لاستخدام النظام:
/*
1. املأ نموذج التسجيل
2. الصفحة ترسل POST لـ /api/auth/register
3. إذا نجح، يحصل على user + tokens
4. تسجيل دخول تلقائي باستخدام NextAuth
5. إعادة توجيه لـ /projects
*/

// Response format من /api/auth/register:
/*
{
  "user": {
    "id": "user-id",
    "email": "user@email.com",
    "name": null,
    "role": "USER",
    "provider": null,
    "providerId": null,
    "avatar": null,
    "createdAt": "date",
    "updatedAt": "date"
  },
  "accessToken": "jwt-token",
  "refreshToken": "refresh-token"
}
*/
