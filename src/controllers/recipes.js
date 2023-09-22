import recipeModel from "../models/recipes.js";

async function getRecipes(req, res) {
  const recipes = await recipeModel.getRecipesByUser(req.session.user.id);
  res.render("recipes", { recipes });
}

const recipeController = {
  getRecipes,
};

export default recipeController;
