import { UserType } from "../enum/indexenum";

export type UserModel = {

  token: string;
  id:number;
  email:string;
  fullName:string;
  imageurl:string;
  role:UserType
  isactive:boolean
};