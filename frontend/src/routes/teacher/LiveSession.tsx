import { useEffect } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";

export const LiveSession: React.FC = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socket.on("connected", (value) => {
      // once the event is successfully handled
      console.log(value);
    });

    return () => {
      socket.off("connected");
    };
  }, []);

  return `Sessione ${sessionId}`;
};
