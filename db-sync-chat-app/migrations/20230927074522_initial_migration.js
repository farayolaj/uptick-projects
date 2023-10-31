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
    .createTable("rooms", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.integer("created_by").unsigned().notNullable();
      table.foreign("created_by").references("users.id").onDelete("CASCADE");
    })
    .createTable("events", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.string("data");
      table.integer("user_id").unsigned().notNullable();
      table.foreign("user_id").references("users.id").onDelete("CASCADE");
      table.integer("room_id").unsigned().notNullable();
      table.foreign("room_id").references("rooms.id").onDelete("CASCADE");
      table.timestamp("timestamp").defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("events").dropTable("rooms").dropTable("users");
}
