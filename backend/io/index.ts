import { Server } from "socket.io";

export const initSocketIo = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // TODO: configure for production
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("connected", "Hello");

    socket.on("salutami", (arg) => {
      socket.emit("saluto", `Ti saluto, ${arg}!`);
    });
  });

  io.emit("messageToEveryone", "Ciao a tutti"); // Broadcast a message
};
