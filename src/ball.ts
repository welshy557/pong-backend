import { Socket } from "socket.io";
import { Room } from ".";

interface BallPosition {
  xPos: number;
  yPos: number;
  angle: number;
  forward: boolean;
}
export default function ball(socket: Socket, rooms: Room[]) {
  socket.on("move-ball", (ballPos: BallPosition) => {
    const room = rooms.find(({ players }) =>
      players.find((player) => player === socket.id)
    );

    if (!room) throw new Error("Room not found");
    socket.to(room.gameId).emit("moved-ball", ballPos);
  });
}
