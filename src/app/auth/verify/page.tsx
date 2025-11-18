"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ButtonLoading from "@/components/Comment/ButtonLoading";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import * as z from "zod";
import { AxiosError } from "axios";
import { useResetPassword } from "@/api/hooks/useAuth";

const ResetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password is required"),
});

type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const resetPasswordMutation = useResetPassword();

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordForm) => {

    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    await toast.promise(
      resetPasswordMutation.mutateAsync({
        email,
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
      {
        loading: "Resetting...",

        success: () => {
          router.push("/auth/signin");
          return "Password reset successfully!";
        },

        error: (err) => {
          const axiosErr = err as AxiosError;

          if (axiosErr.response?.data) {
            return typeof axiosErr.response.data === "string"
              ? axiosErr.response.data
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
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {resetPasswordMutation.isError && (
              <p className="text-center text-sm" style={{ color: "red" }}>
                {(() => {
                  const error = resetPasswordMutation.error as AxiosError;
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={resetPasswordMutation.isPending} />
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
                    <Input {...field} type="password" disabled={resetPasswordMutation.isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonLoading disabled={resetPasswordMutation.isPending}>
              {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
            </ButtonLoading>

          </form>
        </Form>
      </div>
    </div>
  );
}
