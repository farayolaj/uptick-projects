import eventModel from "../models/events.js";

/**
 *
 * @param {import('primus').Spark} spark
 * @param {Object} data
 */
async function handleUserJoin(spark, data) {
  const session = spark.request.session;
  const { roomId } = data;

  spark.join(roomId, async function () {
    console.log(`User[${session.user.id}] joined Room[${roomId}]`);

    const event = await eventModel.createEvent({
      title: "user-joined",
      roomId,
      userId: session.user.id,
    });
    spark.room(roomId).write(event);
  });
}

/**
 *
 * @param {import('primus').Spark} spark
 * @param {Object} data
 */
function handleUserLeave(spark, data) {
  const session = spark.request.session;
  const { roomId } = data;

  spark.leave(roomId, async function () {
    console.log(`User[${session.user.id}] left Room[${roomId}]`);

    const event = await eventModel.createEvent({
      title: "user-left",
      roomId,
      userId: session.user.id,
    });
    spark.room(roomId).except(spark.id).write(event);
  });
}

/**
 *
 * @param {import('primus').Spark} spark
 * @param {Object} data
 */
async function handleMessage(spark, data) {
  const session = spark.request.session;
  const { roomId } = data;

  console.log(`User[${session.user.id}] sent a message`);

  const event = await eventModel.createEvent({
    title: "message",
    roomId,
    userId: session.user.id,
    data: data.data,
  });

  spark.room(roomId).write(event);
}

export default {
  "user-joined": handleUserJoin,
  "user-left": handleUserLeave,
  message: handleMessage,
};
