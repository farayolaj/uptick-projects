import { Router } from "express";
import {
  getLoginPage,
  getSignupPage,
  login,
  logout,
  signup,
} from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/login", getLoginPage);
authRouter.post("/login", login);
authRouter.get("/signup", getSignupPage);
authRouter.post("/signup", signup);
authRouter.get("/logout", logout);

export default authRouter;
