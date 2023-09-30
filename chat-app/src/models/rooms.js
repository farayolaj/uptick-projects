import { db } from "../db/index.js";

async function createRoom({ name, userId }) {
  const [room] = await db("rooms")
    .insert({
      name,
      created_by: userId,
    })
    .returning("*");

  return room;
}

async function listRooms() {
  // Join with users table to get the first name and last name of the user who created the room as created_by
  const rooms = await db("rooms")
    .join("users", "rooms.created_by", "users.id")
    .select(
      "rooms.id",
      "rooms.name",
      db.raw(
        `json_build_object('id', users.id, 'firstName', "users"."firstName", 'lastName', "users"."lastName") as "createdBy"`
      )
    );

  return rooms;
}

async function getRoomById({ id }) {
  const [room] = await db("rooms")
    .join("users", "rooms.created_by", "users.id")
    .select(
      "rooms.id",
      "rooms.name",
      db.raw(
        `json_build_object('id', users.id, 'firstName', "users"."firstName", 'lastName', "users"."lastName") as "createdBy"`
      )
    )
    .where({
      "rooms.id": id,
    });

  return room;
}

const roomModel = {
  createRoom,
  listRooms,
  getRoomById,
};

export default roomModel;
