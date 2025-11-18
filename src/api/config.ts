import axios from "axios";

export const api = axios.create({
  baseURL: "http://mohamedfarjallah-001-site1.mtempurl.com/api/",
});


export const API_ACTION={
    AUTH:{
        SIGNIN:"Account/Login",
        SIGNUP:"Account/Create-account",
        FORGETPASSWORD:""
    }
}