import eventModel from "../models/events.js";
import roomModel from "../models/rooms.js";

async function listRooms(req, res) {
  const rooms = await roomModel.listRooms();
  const message = req.session.message;
  delete req.session.message;
  req.session.save();
  res.render("rooms", { rooms, message });
}

async function createRoom(req, res) {
  const { name } = req.body;
  const userId = req.session.user.id;
  await roomModel.createRoom({ name, userId });
  req.session.message = "Room created successfully!";
  req.session.save();
  res.redirect("/");
}

async function roomDetails(req, res) {
  const { id } = req.params;
  const room = await roomModel.getRoomById({ id });
  const events = await eventModel.getEventsInRoom({ roomId: id });
  res.render("room", { room, events });
}

const roomController = {
  createRoom,
  listRooms,
  roomDetails,
};

export default roomController;
