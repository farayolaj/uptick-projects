import { Router } from "express";
import roomController from "../controllers/rooms.js";

const roomRouter = Router();

roomRouter.get("/", roomController.listRooms);
roomRouter.post("/", roomController.createRoom);
roomRouter.get("/:id", roomController.roomDetails);

export default roomRouter;
