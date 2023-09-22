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

const recipeModel = {
  getRecipesByUser,
  deleteRecipeById,
};

export default recipeModel;
