import { useState } from "react";
import { Play } from "./Play";
import { Register } from "./Register";
import { SocketProvider } from "./SocketContext";

export const LiveExam: React.FC = () => {
  const [user, setUser] = useState<string>();

  return (
    <SocketProvider>
      {user ? <Play user={user} /> : <Register setUser={setUser} />}
    </SocketProvider>
  );
};
