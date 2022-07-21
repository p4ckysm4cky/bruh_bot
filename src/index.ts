require('dotenv').config();
const TOKEN = process.env.TOKEN;
const fs = require('node:fs');
const path = require('node:path');
import { Client, Collection, Intents, Interaction } from 'discord.js';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file: any) => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    commands.set(command.data.name, command);
}

client.once('ready', () => {
    if (client.user) {
        console.log(`${client.user.tag} is ready`);
        client.user.setActivity('to WUB WUB', { type: 'LISTENING' });
    }
});

client.on('interactionCreate', async (interaction: Interaction) => {
    if (!interaction.isCommand()) return;
    const command: any = commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        try {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            });
        } catch (error) {
            console.error("Praying this doesn't crash my program");
        }
    }
});

// Login to Discord with your client's token
client.login(TOKEN);
