const chalk = require("chalk");
const path = require("node:path");
const { config } = require("dotenv");

config({
	path: path.resolve(__dirname, "../.env"),
});

// biome-ignore lint/complexity/noStaticOnlyClass: <no comment needed>
class Logger {
	static alert(msg: string, sendToWebHook: boolean): void {
		console.log(`${chalk.redBright("[!]")} ${msg}`);

		// lets update the webhook to log urgent issues to our attention
		if (process.env.ALERT_DISCORD_WEBHOOK_URL) {
			fetch(process.env.ALERT_DISCORD_WEBHOOK_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: `@everyone **Alert:** ${msg}`,
				}),
			}).catch((err) =>
				Logger.warn(
					`Failed to send alert message through Discord Webhook: ${err}`,
				),
			);
		} else {
			Logger.warn("No Webhook URL specified. Unable to Log to portal.");
		}
	}

	static warn(msg: string): void {
		console.log(`${chalk.yellowBright("[?]")} ${msg}`);
	}
}

module.exports = Logger;
