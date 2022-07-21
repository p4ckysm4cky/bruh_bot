export {};
import { SlashCommandBuilder } from '@discordjs/builders';
import { request } from 'graphql-request';
import { searchUserQuery } from '../anilistGql/queries/userQueries';
import { cleanDescription, genUserEmbed } from '../anilistGql/helperFunctions';
import { Interaction } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anilist')
        .setDescription('Provides information of the anilist user')
        .addStringOption((option: any) =>
            option
                .setName('username')
                .setDescription('Username of user')
                .setRequired(true),
        ),
    async execute(interaction: Interaction) {
        const endpoint = 'https://graphql.anilist.co';
        if (interaction.isCommand()) {
            const variables = {
                user: interaction.options.getString('username'),
            };
            const data = await request(endpoint, searchUserQuery, variables);

            // Info from graphql endpoint
            const name: string = data.User.name;
            // need to check if null
            const about: string = cleanDescription(data.User.about);
            const avatar: string = data.User.avatar.large;
            const siteUrl: string = data.User.siteUrl;
            const animeMeanScore: number = data.User.statistics.anime.meanScore;
            const episodesWatched: number =
                data.User.statistics.anime.episodesWatched;
            const mangaMeanScore: number = data.User.statistics.manga.meanScore;
            const chaptersRead: number =
                data.User.statistics.manga.chaptersRead;

            const embed = genUserEmbed(
                name,
                about,
                avatar,
                siteUrl,
                animeMeanScore,
                episodesWatched,
                mangaMeanScore,
                chaptersRead,
            );
            await interaction.reply({ embeds: [embed] });
        }
    },
};
