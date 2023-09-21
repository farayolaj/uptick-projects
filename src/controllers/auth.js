import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
import { createUser, validateUser } from "../models/users.js";

export async function getLoginPage(req, res) {
  res.render("login");
}

export async function login(req, res) {
  const schema = z
    .object({
      email: z.string().email(),
      password: z.string(),
    })
    .required();

  try {
    const { email, password } = schema.parse(req.body);

    const user = await validateUser({ email, password });
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

export async function getSignupPage(req, res) {
  res.render("signup");
}

export async function signup(req, res) {
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

    const user = await createUser({ firstName, lastName, email, password });
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
