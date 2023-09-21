import { Router } from "express";
import { getLoginPage, getSignupPage, login } from "../controllers/auth.js";

const authRouter = Router();

authRouter.get("/login", getLoginPage);
authRouter.post("/login", login);
authRouter.get("/signup", getSignupPage);

export default authRouter;
