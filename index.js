require("dotenv").config()
const DiscordRPC = require("discord-rpc")
const errorLogHandler = require("./handlers/errorLogHandler")

const client = new DiscordRPC.Client({ transport: "ipc" })
DiscordRPC.register(process.env.ID)

const ErrFileLocation = __dirname + __filename

const activity = async () => {
	const activityObj = {
		details: "Detail",
		state: `State`,
		largeImageKey: "Image name or link",
		largeImageText: "Image text",
		smallImageKey: "Image name or link",
		smallImageText: "Image text",
		instance: true,
		partySize: 2,
		partyMax: 2,
		startTimestamp: Date.now(),
		buttons: [
			{
				label: "✍🏻CV site✍🏻",
				url: "https://alperencapar.github.io/cv/",
			},
		],
	}

	client.setActivity(acitivityObj)
}

client.on("ready", () => {
	console.log("✅Rich Presence is enabled 📈✅")

	activity()

	setInterval(() => {
		activity()
	}, 1000000)
})

client.on("error", (err) => {
	console.error(err)

	errorLogHandler(err, ErrFileLocation)
})

client.login({ clientId: process.env.ID })

process.on("unhandledRejection", (reason, promise) => {
	console.error(reason)
	errorLogHandler(reason, ErrFileLocation, promise)
})

process.on("uncaughtException", (err, origin) => {
	console.error(err, origin)

	errorLogHandler(err, ErrFileLocation)
})
