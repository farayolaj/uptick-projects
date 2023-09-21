import { Router } from "express";
import { getRecipes } from "../controllers/recipes.js";

const recipeRouter = Router();

recipeRouter.get("/", getRecipes);

export default recipeRouter;
