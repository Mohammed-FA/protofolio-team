import axios from "axios";

export const api = axios.create({
  baseURL: "http://mohamed12m-001-site1.ntempurl.com/",
});


export const API_ACTION={
    AUTH:{
        SIGNIN:"Account/Login",
        SIGNUP:"Account/Create-account",
        FORGET_PASSWORD:"Account/ForgetPassword",
        RESET_PASSWORD:"Account/ResetPassword"
    }
}