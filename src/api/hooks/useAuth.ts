import { useMutation } from "@tanstack/react-query";
import {  forgetPassword, loginUser, resetPassword, signupUser } from "../services/auth";
import { LoginData, ResetPasswordData } from "../type/authtype";

// Login hook
export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
  });
}

// Signup hook
export function useSignup() {
  return useMutation({
    mutationFn: (form: FormData) => signupUser(form),
  });
}

// Forget password hook
export function useForgetPassword() {
  return useMutation({
    mutationFn: (email: string) => forgetPassword(email),
  });
}

// Reset password hook
export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => resetPassword(data),
  });
}
