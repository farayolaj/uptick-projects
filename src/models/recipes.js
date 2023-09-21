import { db } from "../db/index.js";

export async function getRecipesByUser(userId) {
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
