import { getRecipesByUser } from "../models/recipes.js";

export async function getRecipes(req, res) {
  const recipes = await getRecipesByUser(req.session.user.id);
  res.render("recipes", { recipes });
}
