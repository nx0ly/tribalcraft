import type WebSocket from "ws";

import { WebSocketServer } from "ws";
import { config } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({
	path: path.resolve(__dirname, ".env"),
});

const Server = new WebSocketServer({ port: Number(process.env.WSPORT) });

Server.on("connection", (stream: WebSocket) => {
    stream.addEventListener("open", () => {});

    stream.addEventListener("message", () => {

    });
});
