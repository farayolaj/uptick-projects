import { Router } from "express";
import authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/login", authController.getLoginPage);
authRouter.post("/login", authController.login);
authRouter.get("/signup", authController.getSignupPage);
authRouter.post("/signup", authController.signup);
authRouter.get("/logout", authController.logout);

export default authRouter;
