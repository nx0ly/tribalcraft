import chalk from 'chalk';
import path from 'path';
import { config } from 'dotenv';

config({
    path: path.resolve(__dirname, "../.env")
});

// biome-ignore lint/complexity/noStaticOnlyClass: <no comment needed>
class Logger {
    static alert(msg) {
        console.log(`${chalk.redBright("[!]")} ${msg}`);

        // lets update the webhook to log urgent issues to our attention
		if(process.env.ALERT_DISCORD_WEBHOOK_URL) {
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

    static warn(msg) {
        console.log(`${chalk.yellowBright("[?]")} ${msg}`);
    }
}

Logger.alert("System alert test")
Logger.warn("System warning test")

export default Logger;