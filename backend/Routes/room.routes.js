const express = require("express");
const { RoomModal } = require("../Modals/rooms.modal");

const roomsRouter = express.Router();

roomsRouter.get("/all", async (req, res) => {
  const { userId } = req.body;
  console.log(123);
  try {
    const rooms = await RoomModal.find({ userId });
    res.json({ rooms });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

roomsRouter.get("/single/:roomId", async (req, res) => {
  const { roomId } = req.params;
  console.log(roomId);
  try {
    const room = await RoomModal.findOne({ _id: roomId });
    res.json({ msg: "request successfull", room });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

roomsRouter.post("/create", async (req, res) => {
  console.log(req.body);
  try {
    const room = new RoomModal({
      ...req.body,
      code: `console.log("Hello from Priyank")`,
    });
    await room.save();
    res.status(201);
    res.send({ msg: "room has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

roomsRouter.delete("/delete/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    await RoomModal.findByIdAndDelete(roomId);
    res.send({ msg: "room has baan deleted" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

module.exports = roomsRouter;
