import bcrypt from "bcrypt";
import { db } from "../db/index.js";

export async function getUserById(id) {
  const user = await db("users").where({ id }).first();
  return user;
}

export async function getUserByEmail(email) {
  const user = await db("users").where({ email }).first();
  return user;
}

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function createUser({ email, password, firstName, lastName }) {
  const hashedPassword = await hashPassword(password);
  const [user] = await db("users")
    .insert({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    })
    .returning("*");

  return user;
}

export async function validateUser({ email, password }) {
  const user = await getUserByEmail(email);

  if (!user) throw new Error("Invalid login details");

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Invalid login details");

  return user;
}
