import mongoose from "mongoose";
import config from "../config.js";

const { Schema } = mongoose;

export default async function connectToMongoDb() {
  await mongoose.connect(config.db.mongoUrl, {
    autoCreate: true,
  });
  console.log("Connected to mongo database");
}

const userSchema = Schema({
  pgId: {
    type: Number,
    index: true,
  },
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

userSchema.statics.findByPgId = function (pgId) {
  return this.findOne({ pgId: parseInt(pgId) });
};

const roomSchema = Schema({
  pgId: {
    type: Number,
    index: true,
  },
  name: String,
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
});

roomSchema.statics.findByPgId = function (pgId) {
  return this.findOne({ pgId: parseInt(pgId) });
};

const eventSchema = Schema({
  pgId: {
    type: Number,
    index: true,
  },
  title: String,
  data: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  room: { type: Schema.Types.ObjectId, ref: "Room" },
  timestamp: { type: Date, default: Date.now },
});

eventSchema.statics.findByPgId = function (pgId) {
  return this.findOne({ pgId: parseInt(pgId) });
};

export const User = mongoose.model("User", userSchema);
export const Room = mongoose.model("Room", roomSchema);
export const Event = mongoose.model("Event", eventSchema);
