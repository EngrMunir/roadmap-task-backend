import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

type Role = 'user' | 'admin';

export interface IUser {
    name:string;
    email:string;
    password:string;
    role: Role;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface UserModel extends Model<IUser>{
    isUserExistByEmail(email:string):Promise<IUser|null>;
    isPasswordMatched(
        plainTextPassword:string,
        hashedPassword:string,
    ):Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;