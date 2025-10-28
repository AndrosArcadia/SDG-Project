import express from "express";
import http from "http";
import { Server } from "colyseus";
import { MyRoom } from "./rooms/MyRoom";

const app = express();
const server = http.createServer(app);
const gameServer = new Server({ server });

gameServer.define("my_room", MyRoom);

const PORT = 2567;
gameServer.listen(PORT);
console.log(`✅ Servidor Colyseus escuchando en puerto ${PORT}`);
