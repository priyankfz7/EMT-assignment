const { default: mongoose } = require("mongoose");

const roomSchema = mongoose.Schema({
  roomname: String,
  code: String,
  userId: String,
});

const RoomModal = mongoose.model("room", roomSchema);

module.exports = { RoomModal };
