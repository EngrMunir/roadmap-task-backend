/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../../modules/User/user.interface";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../errors/AppError";
import status from "http-status";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../../modules/User/user.model";
import jwt from 'jsonwebtoken';


const auth = (...requiredRoles:TUserRole[])=>{
    return catchAsync( async (req:Request, res:Response, next:NextFunction)=>{
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            throw new AppError(status.UNAUTHORIZED, 'Your are not authorized!');
        }
       
        let decoded;

        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload;
        } catch (error) {
            
            throw new AppError(status.UNAUTHORIZED,'Unauthorized');
        }

        const { role, email } = decoded;

        const user = await User.isUserExistByEmail(email);
        if(!user){
            throw new AppError(status.NOT_FOUND,'This user is not exist');
        }

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(
                status.UNAUTHORIZED,
                'Your are not authorized!!'
            );
        }
        req.user = {
            _id: user._id?.toString(),
            email: user.email,
            role: user.role,
        };

            next();

    })
};

export default auth;