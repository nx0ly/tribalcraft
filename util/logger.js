"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var url_1 = require("url");
var __dirname = (0, path_1.dirname)((0, url_1.fileURLToPath)(import.meta.url));
(0, dotenv_1.config)({
    path: (0, path_1.resolve)(__dirname, "../", ".env")
});
// biome-ignore lint/complexity/noStaticOnlyClass: <no comment needed>
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.alert = function (msg) {
        console.log("".concat(chalk_1.default.redBright("[!]"), " ").concat(msg));
        // lets update the webhook to log urgent issues to our attention
        if (process.env.ALERT_DISCORD_WEBHOOK_URL) {
            fetch(process.env.ALERT_DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: "@everyone **Alert:** ".concat(msg)
                })
            }).catch(function (err) { return Logger.warn("Failed to send alert message through Discord Webhook: ".concat(err)); });
        }
    };
    Logger.warn = function (msg) {
        console.log("".concat(chalk_1.default.yellowBright("[?]"), " ").concat(msg));
    };
    Logger.info = function (msg) {
        console.log("".concat(chalk_1.default.greenBright("[-]"), " ").concat(msg));
    };
    return Logger;
}());
Logger.alert("Allah");
exports.default = Logger;
