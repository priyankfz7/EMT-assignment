const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./actions");
const { connection } = require("./Config/db");
const cors = require("cors");
const { userRouter } = require("./Routes/user.routes");

const authentication = require("./Middlewares/middleware");
const roomsRouter = require("./Routes/room.routes");
const { RoomModal } = require("./Modals/rooms.modal");

//user login setup
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use(authentication);
app.use("/rooms", roomsRouter);

//demo call
app.get("/", (req, res) => {
  res.send("This is EMT Project");
});

//socket io server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("new connection");
  //for connecting a user
  socket.on(ACTIONS.JOIN, async ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    console.log(clients);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
    //console.log({ roomId, username });
    // const code = new CodeModal({ code: username });
    // console.log(code);
    // await code.save();
  });

  socket.on(ACTIONS.CODE_CHANGE, async ({ roomId, code }) => {
    console.log(code);
    await RoomModal.findByIdAndUpdate(roomId, { code });
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  //when a user disconnect
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(8080, async () => {
  try {
    connection;
    console.log("connected with mongodb");
  } catch (e) {
    console.log(e);
  }
  console.log("running on 8080");
});
