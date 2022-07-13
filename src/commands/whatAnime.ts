export {};
const axios = require('axios').default;
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

function genEmbedTrace(traceResult: any) {
    const similarity = traceResult.similarity.toFixed(2);
    const embed = new MessageEmbed()
        .setColor('#E91E63')
        .setTitle(traceResult.filename)
        .addFields({ name: `Episode: ${traceResult.episode}`, value: '\u200B' })
        .addFields({ name: '\u200B', value: `Similarity: ${similarity}` })
        .setURL(`https://anilist.co/anime/${traceResult.anilist}/`)
        .setThumbnail(traceResult.image)
        .setDescription('')
        .setFooter({ text: 'Powered by trace.moe' });
    return embed;
}

async function queryTracerMoe(imageUrl: string) {
    const endpoint = `https://api.trace.moe/search?&url=${imageUrl}`;
    // Parameter for searching image
    const response = await axios.get(endpoint);
    const data = response.data;
    // Check if no errors;
    if (data.error !== undefined) {
        const firstResult = data.result[0];
        return genEmbedTrace(firstResult);
    } else {
        throw 'No results found';
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whatanime')
        .setDescription('Finds what anime the image is likely from')
        .addStringOption((option: any) =>
            option
                .setName('imageurl')
                .setDescription('image url of the anime screenshot')
                .setRequired(true),
        ),
    async execute(interaction: any) {
        const imageUrl: string = interaction.options.getString('imageurl');
        try {
            await interaction.deferReply();
            const embed = await queryTracerMoe(imageUrl);
            await interaction.editReply({ embeds: [embed] });
        } catch (e) {
            await interaction.editReply({
                content: `${e}`,
                ephemeral: true,
            });
        }
    },
};
