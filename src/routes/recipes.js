import { Router } from "express";
import recipeController from "../controllers/recipes.js";

const recipeRouter = Router();

recipeRouter.get("/", recipeController.getRecipes);

export default recipeRouter;
