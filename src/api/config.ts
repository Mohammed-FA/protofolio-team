import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7245/api/",
});


export const API_ACTION={
    AUTH:{
        SIGNIN:"Account/Login",
        SIGNUP:"Account/Create-account",
        FORGET_PASSWORD:"Account/ForgetPassword",
        RESET_PASSWORD:"Account/ResetPassword"
    }
}