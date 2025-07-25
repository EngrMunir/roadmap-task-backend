import express from 'express'
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post(
  '/logout',
  AuthControllers.logoutUser,
);

router.post(
  '/register',
  AuthControllers.registerUser,
);

router.post(
  '/login',
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  AuthControllers.refreshToken,
);


export const AuthRoutes = router;