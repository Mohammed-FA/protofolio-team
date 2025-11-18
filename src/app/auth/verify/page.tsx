"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Comment/Logo";
import ButtonLoading from "@/components/Comment/ButtonLoading";

const VerifyCodeSchema = z.object({
  code: z.string().min(1, "Verification code is required"),
});

export default function VerifyCodePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof VerifyCodeSchema>>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: { code: "" },
  });

  const onSubmit = async (values: z.infer<typeof VerifyCodeSchema>) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: values.code }),
      });

      if (res.ok) {
        // الانتقال لصفحة إعادة تعيين كلمة المرور
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "Invalid verification code.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Logo />
          <h2 className="text-sm font-normal my-4 text-gray-700 text-center">
            Enter the verification code sent to your email
          </h2>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Code" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ButtonLoading disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </ButtonLoading>
          </form>
        </Form>

        {errorMessage && <p className="mt-4 text-red-600 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
}
