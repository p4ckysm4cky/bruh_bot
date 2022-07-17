export {};
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

// The latest xkcd number, please update if you feel the need to
const xkcdRange = 2646;

type xkcdReturn = {
    title: string;
    num: number;
    img: string;
    month: string;
    year: string;
    day: string;
};

function xkcdEmbed(data: xkcdReturn) {
    const embed = new MessageEmbed()
        .setColor('#E91E63')
        .setTitle(`${data.title} #${data.num}`)
        .setImage(data.img)
        .setURL(`https://xkcd.com/${data.num}/`)
        .setFooter({ text: `xkcd ${data.day}/${data.month}/${data.year}` });
    return embed;
}

async function getXkcd(num: string) {
    const url = `https://xkcd.com/${num}/info.0.json`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xkcd')
        .setDescription('Replies with a xkcd comic')
        .addStringOption((option: any) =>
            option
                .setName('number')
                .setDescription('The comic number')
                .setRequired(false),
        ),
    async execute(interaction: any) {
        let message: string = interaction.options.getString('number');
        await interaction.deferReply();
        try {
            // Generate random number if message is empty
            if (!message) {
                const genNumber = Math.floor(Math.random() * xkcdRange) + 1;
                message = String(genNumber);
            }
            const data = await getXkcd(message);
            const embed = xkcdEmbed(data);
            await interaction.editReply({ embeds: [embed] });
        } catch (e) {
            await interaction.editReply({
                content: `${e}`,
                ephemeral: true,
            });
        }
    },
};
