import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

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
