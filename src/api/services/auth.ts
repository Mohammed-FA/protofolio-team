import { api, API_ACTION } from "../config";
import { ApiErrorResponse, ApiResponseMessage, LoginData, ResetPasswordData } from "../type/authtype";
import { UserModel } from "../type/models/user";


export async function loginUser(data: LoginData): Promise<UserModel> {
  const res = await api.post<UserModel>(API_ACTION.AUTH.SIGNIN, data);
  return res.data;
}

export async function signupUser(form: FormData): Promise<ApiResponseMessage | ApiErrorResponse> {
  const res = await api.post<ApiResponseMessage | ApiErrorResponse>(API_ACTION.AUTH.SIGNUP, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function forgetPassword(email: string): Promise<ApiResponseMessage | ApiErrorResponse> {
  const res = await api.post<ApiResponseMessage | ApiErrorResponse>(
    API_ACTION.AUTH.FORGET_PASSWORD,
    JSON.stringify(email),
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
}

export async function resetPassword(
  data: ResetPasswordData
): Promise<ApiResponseMessage | ApiErrorResponse> {
  const res = await api.post<ApiResponseMessage | ApiErrorResponse>(
    API_ACTION.AUTH.RESET_PASSWORD,
    data,
    { headers: { "Content-Type": "application/json" } }
  );
  return res.data;
}
