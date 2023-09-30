import { db } from "../db/index.js";

/**
 * @typedef {Object} RoomEvent
 * @property {'message' | 'user-joined' | 'user-left'} title
 * @property {string} [data]
 * @property {number} roomId
 * @property {number} userId
 * @property {string} [timestamp]
 */

/**
 *
 * @param {RoomEvent} data
 */
async function createEvent({ title, data, roomId, userId }) {
  const [event] = await db
    .with("inserted_event", (qb) => {
      qb.table("events")
        .insert({
          title,
          data,
          room_id: roomId,
          user_id: userId,
        })
        .returning("*");
    })
    .from("inserted_event")
    .join("users", "inserted_event.user_id", "users.id")
    .select(
      "inserted_event.*",
      db.raw(
        `json_build_object('id', "users"."id", 'firstName', "users"."firstName", 'lastName', "users"."lastName") as user`
      )
    );

  return event;
}

async function getEventsInRoom({ roomId }) {
  const events = await db("events")
    .select(
      "events.*",
      db.raw(
        `json_build_object('id', "users"."id", 'firstName', "users"."firstName", 'lastName', "users"."lastName") as user`
      )
    )
    .join("users", "events.user_id", "users.id")
    .where({
      room_id: roomId,
    })
    .orderBy("timestamp", "asc");

  return events;
}

const eventModel = {
  createEvent,
  getEventsInRoom,
};

export default eventModel;
