import { Server } from "socket.io";
import { Message, User } from "../../api-types/socketIo-types";
import { messageLimit } from "./config";

// Follow https://socket.io/docs/v4/server-application-structure/ for organizing handlers

export const initSocketIo = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*", // TODO: configure for production
    },
  });

  /**
   * Keep track of all connected users
   */
  let users: User[] = [];

  /**
   * Keep track of all messages
   */
  const messages: Message[] = [];

  /**
   * Keep track of the total number of messages
   */
  let totalMessager = 0;

  io.on("connection", (socket) => {
    console.log("Si è connesso", socket.id);
    socket.emit("message", messages);
    socket.emit("totalMessages", totalMessager);
    socket.emit("users", users);

    socket.emit("connected", "Hello");

    socket.on("disconnect", () => {
      console.log("Si è disconnesso", socket.id);
      users = users.filter((user) => user.id !== socket.id);
      io.emit("Tutti gli utenti connessi", users);
    });

    socket.on("register", (user: string) => {
      console.log("Si è registrato", user);
      users.push({ id: socket.id, name: user, responses: [] });
      io.emit("users", users);
      socket.emit("message", messages);
      socket.emit("totalMessages", totalMessager);
      console.log("Tutti gli utenti connessi", users);
    });

    socket.on("message", (text: string) => {
      console.log("Messaggio ricevuto", text);
      totalMessager++;
      messages.push({
        user: users.find((user) => user.id === socket.id) || {
          id: socket.id,
          name: "utente disconnesso",
        },
        text,
      });
      // keep only the last 50 messages
      if (messages.length > messageLimit) {
        messages.splice(0, messages.length - messageLimit);
      }
      io.emit("message", messages);
      io.emit("totalMessages", totalMessager);
    });

    socket.on("response", (response) => {
      const user = users.find((user) => user.id === socket.id);
      console.log(
        "Risposta ricevuta",
        response,
        "dall'utente",
        user,
        socket.id,
      );
      console.log("Tutti gli utenti connessi", users);
      if (user) {
        user.responses = user.responses || [];
        if (user.responses.find((r) => r.questionId === response.questionId)) {
          user.responses = user.responses.map((r) =>
            r.questionId === response.questionId ? response : r,
          );
        } else {
          user.responses.push(response);
        }
        io.emit("users", users);
      }
    });
  });

  // io.emit("messageToEveryone", "Ciao a tutti"); // Broadcast a message
};
