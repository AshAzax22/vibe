import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL;

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

const connectSocket = () => {
  socket.connect();
  socket.on("connect", () => {
    console.log("connected with socket id: ", socket.id);
  });

  return socket;
};

export { socket, connectSocket };
