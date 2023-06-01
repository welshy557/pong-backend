import { Socket } from "socket.io";
import { Room } from ".";

export default function game(socket: Socket, rooms: Room[]) {
  let playerCount = 0;
  socket.on("start-game", () => {
    const room = rooms.find((room) =>
      room.players.find((player) => player === socket.id)
    );

    if (!room) throw new Error("No room");

    socket.to(room.gameId).emit("started-game", ++playerCount);

    socket.emit("started-game", ++playerCount);

    if (playerCount === 2) playerCount = 0;
  });

  socket.on("create-game", (gameId: string) => {
    socket.join(gameId);
    rooms.push({ gameId, playerCount: 1, players: [socket.id] });
  });

  socket.on("join-game", (gameId: string) => {
    const room = rooms.find((room) => room.gameId === gameId);

    if (!room || room.playerCount === 2) return;
    socket.join(gameId);
    socket.to(gameId).emit("joined-game");
    socket.emit("joined-game");
    room.playerCount = 2;
    room.players.push(socket.id);
  });
}
