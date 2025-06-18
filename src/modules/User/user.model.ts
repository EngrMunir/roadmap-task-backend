import { Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { USER_ROLE } from "./user.constant";

const userSchema = new Schema<IUser, UserModel>(
  {
    name:{
        type:String,
        required:[true, 'User name is required']
    },
    email:{
        type:String,
        required:true,
        match:[
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        enum:[USER_ROLE.user, USER_ROLE.admin],
        default:USER_ROLE.user
    },
  },
  {
    timestamps:true
  }  
);