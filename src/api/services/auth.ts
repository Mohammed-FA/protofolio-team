import { useMutation } from "@tanstack/react-query";
import { api, API_ACTION } from "../config";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: {result:string};
  user: {
    id: string;
    email: string;
    name: string;
  };
};

export function useLogin() {
  const mutation = useMutation<LoginResponse, unknown, LoginData>({
    mutationFn: async (data: LoginData) => {
      const res = await api.post<LoginResponse>(API_ACTION.AUTH.SIGNIN, data);
      return res.data;
    },
  });

  return mutation;
}

export function useSignup() {
  return useMutation({
    mutationFn: async (form: FormData) => {
      const res = await api.post(API_ACTION.AUTH.SIGNUP, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    },
  });
}