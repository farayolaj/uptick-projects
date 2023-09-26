import { db } from "../db/index.js";

async function getRecipesByUser(userId) {
  const recipes = await db("recipes")
    .select([
      "recipes.id",
      "recipes.title",
      "recipes.description",
      db.raw(
        "coalesce(json_agg(to_jsonb(ingredients) - 'recipe_id') filter (where ingredients.recipe_id is not null), '[]') as ingredients"
      ),
    ])
    .leftJoin("ingredients", "recipes.id", "ingredients.recipe_id")
    .where({ user_id: userId })
    .groupBy("recipes.id");

  return recipes;
}

async function deleteRecipeById(recipeId) {
  const [recipe] = await db("recipes")
    .where({ id: recipeId })
    .del()
    .returning("*");

  return recipe;
}

async function addRecipe(userId, { title, description }) {
  const [recipe] = await db("recipes")
    .insert({ user_id: userId, title, description })
    .returning("*");

  return recipe;
}

async function getRecipeById(recipeId) {
  const [recipe] = await db("recipes")
    .select([
      "recipes.id",
      "recipes.title",
      "recipes.description",
      db.raw(
        "coalesce(json_agg(to_jsonb(ingredients) - 'recipe_id') filter (where ingredients.recipe_id is not null), '[]') as ingredients"
      ),
    ])
    .leftJoin("ingredients", "recipes.id", "ingredients.recipe_id")
    .where({ 'recipes.id': recipeId })
    .groupBy("recipes.id");

  return recipe;
}

async function addIngredient(recipeId, { name, quantity, unit }) {
  const [ingredient] = await db("ingredients")
    .insert({ recipe_id: recipeId, name, quantity, unit })
    .returning("*");

  return ingredient;
}

async function deleteIngredient(ingredientId) {
  const [ingredient] = await db("ingredients")
    .where({ id: ingredientId })
    .del()
    .returning("*");

  return ingredient;
}

const recipeModel = {
  getRecipesByUser,
  deleteRecipeById,
  addRecipe,
  getRecipeById,
  addIngredient,
  deleteIngredient,
};

export default recipeModel;
