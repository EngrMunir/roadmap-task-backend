import status from "http-status";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";
import AppError from "../../app/errors/AppError";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import config from "../../app/config";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const registerUser = async (payload: IUser) => {

  const user = await User.isUserExistByEmail(payload?.email);
  if (user) throw new AppError(status.CONFLICT, 'User already exists!');
  
  const result = await User.create(payload);

  return result;
};

// Login user
const loginUser = async (payload: TLoginUser) => {
  
  const user = await User.isUserExistByEmail(payload?.email);

  if (!user) throw new AppError(status.NOT_FOUND, 'User not found!');

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(status.FORBIDDEN, 'Password not match!');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
 
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
 
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  
  const user = await User.isUserExistByEmail(email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found !');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
  );

  return {
    accessToken,
  };
};

const logoutUser = async (refreshToken: string) => {
  const result = await User.findOneAndUpdate(
    { refreshToken },
    { refreshToken: null },
    { new: true },
  );
  return result;
};

export const AuthService = {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
};