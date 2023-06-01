import { createServer } from "http";
import game from "./game";
import { Server } from "socket.io";
import ball from "./ball";
import player from "./player";

export interface Room {
  gameId: string;
  players: string[];
  playerCount: number;
}

function main() {
  const rooms: Room[] = [];
  const httpServer = createServer();
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Connected with ID: ${socket.id}`);
    game(socket, rooms);
    ball(socket, rooms);
    player(socket, rooms);
  });

  httpServer.listen(3000, () => console.log("Listening on port 3000"));
}

main();
