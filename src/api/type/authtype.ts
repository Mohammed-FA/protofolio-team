
export type LoginData = {
  email: string;
  password: string;
};


export type ApiResponseMessage = {
  message: string;
};

export type ApiErrorResponse = {
  errors: {
    code: string;
    description: string;
  }[];
};

export type ResetPasswordData = {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
};
