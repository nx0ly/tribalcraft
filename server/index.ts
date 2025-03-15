import express from "express";
import InitServer from "./server.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.get("/", (req, res) => {
    res.sendFile(resolve(__dirname, "../public/home/home.html"));
});

app.get("*", (req, res) => {
    const filePath = resolve(__dirname, `../${req.path}`);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(resolve(__dirname, "../public/error/error.html"));
        }
    });
});

app.listen(3000, () => {
    console.log("HTTP server listening on port 3000");
});

InitServer();