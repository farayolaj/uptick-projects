import { Router } from "express";
import recipeController from "../controllers/recipes.js";

const recipeRouter = Router();

recipeRouter.get("/", recipeController.getRecipes);
recipeRouter.post("/", recipeController.addRecipe);
recipeRouter.get("/new", recipeController.addRecipePage);
recipeRouter.get("/ingredients/:id/delete", recipeController.deleteIngredient);
recipeRouter.get("/:id", recipeController.getRecipeDetail);
recipeRouter.get("/:id/delete", recipeController.deleteRecipe);
recipeRouter.post("/:id/ingredients", recipeController.addIngredient);

export default recipeRouter;
