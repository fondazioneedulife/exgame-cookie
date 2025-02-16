import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { config } from "../../config";

const useSocketIo = () => {
  const socketIo = useRef<ReturnType<typeof io>>();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socketIo.current = io(config.API_BASEPATH);

    socketIo.current.on("connect", () => {
      console.log("Socket connected", socketIo.current?.id);
      setConnected(true);
    });

    return () => {
      socketIo.current?.disconnect();
      setConnected(false);
    };
  }, []);

  return [socketIo, connected] as [
    React.MutableRefObject<Socket | undefined>,
    boolean,
  ];
};

const SocketContext = createContext<{
  socketIo: React.MutableRefObject<Socket | undefined>;
  connected: boolean;
}>({
  socketIo: { current: undefined },
  connected: false,
});

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socketIo, connected] = useSocketIo();
  const contextValue = useMemo(
    () => ({ socketIo, connected }),
    [socketIo, connected],
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketIoContext = () => useContext(SocketContext);
