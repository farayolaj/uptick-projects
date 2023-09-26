/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
    })
    .createTable("recipes", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.string("description").notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
    })
    .createTable("ingredients", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("quantity").notNullable();
      table.string("unit").notNullable();
      table.integer("recipe_id").unsigned().notNullable();
      table.foreign("recipe_id").references("recipes.id").onDelete("CASCADE");
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable("ingredients")
    .dropTable("recipes")
    .dropTable("users");
}
