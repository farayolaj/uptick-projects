import recipeModel from "../models/recipes.js";

async function getRecipes(req, res) {
  const recipes = await recipeModel.getRecipesByUser(req.session.user.id);
  const deletedRecipe = req.session.deletedRecipe;
  delete req.session.deletedRecipe;

  res.render("recipes", { recipes, deletedRecipe });
}

async function deleteRecipe(req, res) {
  const recipe = await recipeModel.deleteRecipeById(req.params.id);
  req.session.deletedRecipe = recipe;
  res.redirect("/recipes");
}

const recipeController = {
  getRecipes,
  deleteRecipe,
};

export default recipeController;
