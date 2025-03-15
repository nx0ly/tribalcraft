import chalk from 'chalk';
import { config } from 'dotenv';
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: resolve(__dirname, "../", ".env")
});

// biome-ignore lint/complexity/noStaticOnlyClass: <no comment needed>
class Logger {
    static alert(msg: string) {
        console.log(`${chalk.redBright("[!]")} ${msg}`);

        // lets update the webhook to log urgent issues to our attention
        if (process.env.ALERT_DISCORD_WEBHOOK_URL) {
            fetch(process.env.ALERT_DISCORD_WEBHOOK_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `@everyone **Alert:** ${msg}`
                })
            }).catch(err => Logger.warn(`Failed to send alert message through Discord Webhook: ${err}`));
        }
    }

    static warn(msg: string) {
        console.log(`${chalk.yellowBright("[?]")} ${msg}`);
    }

    static info(msg: string) {
        console.log(`${chalk.greenBright("[-]")} ${msg}`);
    }
}

Logger.alert("Allah")

export default Logger;