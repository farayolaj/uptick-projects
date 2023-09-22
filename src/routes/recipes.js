import { Router } from "express";
import recipeController from "../controllers/recipes.js";

const recipeRouter = Router();

recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.get("/:id/delete", recipeController.deleteRecipe);

export default recipeRouter;
