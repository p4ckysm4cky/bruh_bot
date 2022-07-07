export {}
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
        .addStringOption((option:any) =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),
	async execute(interaction:any) {
        const message:string = interaction.options.getString("input")
		await interaction.reply(`${message}`);
	},
};