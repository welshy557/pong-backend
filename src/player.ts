import { Socket } from "socket.io";
import { Room } from ".";

interface PlayerPosition {
  xPos: number;
  yPos: number;
}
export default function ball(socket: Socket, rooms: Room[]) {
  socket.on("move-player", (playPos: PlayerPosition) => {
    const room = rooms.find(({ players }) =>
      players.find((player) => player === socket.id)
    );

    if (!room) throw new Error("Room not found");
    socket.to(room.gameId).emit("moved-player", playPos);
  });
}
