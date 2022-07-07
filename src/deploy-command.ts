const fs = require('node:fs');
const path = require('node:path');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const commands: any[] = [];

const commandsPath:any = path.join(__dirname, 'commands');
const commandFiles:any = fs.readdirSync(commandsPath).filter((file:any) => file.endsWith('.ts') || file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
    console.log(`${command.data.name} was registered`)
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);

export {}
