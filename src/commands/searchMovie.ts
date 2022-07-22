export {};
const IMDBAPI = process.env.IMDBAPI;
const axios = require('axios').default;
import { SlashCommandBuilder } from '@discordjs/builders';
import { Interaction, MessageEmbed } from 'discord.js';

type ImdbMovie = {
    id: string;
    resultType: string;
    image: string;
    title: string;
    description: string;
};

function genImdbEmbed(movie: ImdbMovie): MessageEmbed {
    const embed = new MessageEmbed()
        .setColor('#d4d7f8')
        .setTitle(movie.title)
        .setDescription(movie.description)
        .setImage(movie.image)
        .setURL(`https://www.imdb.com/title/${movie.id}/`)
        .setFooter({ text: 'Powered by imdb' });
    return embed;
}

async function queryImdb(movieName: string) {
    const endpoint = `https://imdb-api.com/en/API/SearchMovie/${IMDBAPI}/${movieName}`;
    const response = await axios.get(endpoint);
    const data = response.data;
    // Check if no errors;
    if (data.results.length > 0) {
        const firstResult: ImdbMovie = data.results[0];
        return genImdbEmbed(firstResult);
    } else {
        throw 'No results found';
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('movie')
        .setDescription('Shows first result of searched movie')
        .addStringOption((option: any) =>
            option
                .setName('name')
                .setDescription('name of movie you want to search')
                .setRequired(true),
        ),
    async execute(interaction: Interaction) {
        if (interaction.isCommand()) {
            const movieName = interaction.options.getString('name');
            try {
                await interaction.deferReply();
                if (movieName) {
                    const embed = await queryImdb(movieName);
                    await interaction.editReply({ embeds: [embed] });
                }
            } catch (e) {
                await interaction.editReply({
                    content: `${e}`,
                });
            }
        }
    },
};
