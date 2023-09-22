import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import userModel from "../models/users.js";

async function getLoginPage(req, res) {
  res.render("login");
}

async function login(req, res) {
  const schema = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .required();

  try {
    const { email, password } = schema.parse(req.body);

    const user = await userModel.validateUser({ email, password });
    req.session.user = user;

    return res.redirect("/");
  } catch (error) {
    let errMessage;

    if (error instanceof ZodError) {
      errMessage = fromZodError(error);
    } else {
      errMessage = error.message;
    }

    return res.render("login", {
      error: errMessage,
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });
  }
}

async function getSignupPage(req, res) {
  res.render("signup");
}

async function signup(req, res) {
  const schema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string(),
    })
    .required()
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  try {
    const { firstName, lastName, email, password } = schema.parse(req.body);

    const user = await userModel.createUser({
      firstName,
      lastName,
      email,
      password,
    });
    req.session.user = user;

    return res.redirect("/");
  } catch (error) {
    let errMessage;

    if (error instanceof ZodError) {
      errMessage = fromZodError(error).message;
    } else {
      errMessage = error.message;
    }

    return res.render("signup", { error: errMessage, data: req.body });
  }
}

function logout(req, res) {
  req.session.destroy();
  res.redirect("/");
}

const authController = {
  getLoginPage,
  login,
  getSignupPage,
  signup,
  logout,
};

export default authController;
