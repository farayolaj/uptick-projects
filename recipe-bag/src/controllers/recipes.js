import { ZodError, z } from "zod";
import { fromZodError } from "zod-validation-error";
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

function addRecipePage(req, res) {
  res.render("add-recipe");
}

async function addRecipe(req, res) {
  const schema = z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .required();

  try {
    const { title, description } = schema.parse(req.body);

    const recipe = await recipeModel.addRecipe(req.session.user.id, {
      title,
      description,
    });

    return res.redirect(`/recipes/${recipe.id}`);
  } catch (error) {
    let errMessage;

    if (error instanceof ZodError) {
      errMessage = fromZodError(error);
    } else {
      errMessage = error.message;
    }

    return res.render("add-recipe", {
      error: errMessage,
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });
  }
}

async function getRecipeDetail(req, res) {
  const recipe = await recipeModel.getRecipeById(req.params.id);
  res.render("recipe-detail", { recipe });
}

async function addIngredient(req, res) {
  const schema = z
    .object({
      name: z.string(),
      quantity: z.number(),
      unit: z.string(),
    })
    .required();

  try {
    req.body.quantity = Number.parseFloat(req.body.quantity);
    const { name, quantity, unit } = schema.parse(req.body);

    await recipeModel.addIngredient(req.params.id, {
      name,
      quantity,
      unit,
    });

    return res.redirect(`/recipes/${req.params.id}`);
  } catch (error) {
    let errMessage;

    if (error instanceof ZodError) {
      errMessage = fromZodError(error);
    } else {
      errMessage = error.message;
    }

    const recipe = await recipeModel.getRecipeById(req.params.id);

    return res.render("recipe-detail", {
      recipe,
      error: errMessage,
      data: {
        name: req.body.name,
        quantity: req.body.quantity,
        unit: req.body.unit,
      },
    });
  }
}

async function deleteIngredient(req, res) {
  const ingredient = await recipeModel.deleteIngredient(req.params.id);
  res.redirect(`/recipes/${ingredient.recipe_id}`);
}

const recipeController = {
  getRecipes,
  deleteRecipe,
  addRecipePage,
  addRecipe,
  getRecipeDetail,
  addIngredient,
  deleteIngredient,
};

export default recipeController;
