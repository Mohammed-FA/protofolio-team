import { UserType } from "../enum/indexenum";

export type UserModel = {

  token: string;
  id:number;
  email:string;
  fullname:string;
  imageurl:string;
  role:UserType
  isactive:boolean
};