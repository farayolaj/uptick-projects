import { Router } from "express";
import { getLoginPage, getSignupPage } from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/login", getLoginPage);
authRouter.get("/signup", getSignupPage);

export default authRouter;
