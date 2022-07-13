export {};
const { SlashCommandBuilder } = require('@discordjs/builders');
import { request } from 'graphql-request';
import { searchAnimeQuery } from '../anilistGql/queries/animeQueries';
import { cleanDescription, genMediaEmbed } from '../anilistGql/helperFunctions';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Information about the requested anime')
        .addStringOption((option: any) =>
            option
                .setName('name')
                .setDescription('Name of anime you want to query')
                .setRequired(true),
        ),
    async execute(interaction: any) {
        const endpoint = 'https://graphql.anilist.co';
        const variables = { animeName: interaction.options.getString('name') };
        const data = await request(endpoint, searchAnimeQuery, variables);

        // Info from graphql endpoint
        const siteUrl: string = data.Media.siteUrl;
        const episodes: number = data.Media.episodes;
        const description: string = cleanDescription(data.Media.description);
        const color: string = data.Media.coverImage.color;
        const coverImage: string = data.Media.coverImage.extraLarge;
        const title: string = data.Media.title.userPreferred;

        const embed = genMediaEmbed(
            color,
            title,
            siteUrl,
            description,
            coverImage,
            episodes,
        );

        await interaction.reply({ embeds: [embed] });
    },
};
