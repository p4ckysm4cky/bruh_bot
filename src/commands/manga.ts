export {};
import { SlashCommandBuilder } from '@discordjs/builders';
import { request } from 'graphql-request';
import { searchMangaQuery } from '../anilistGql/queries/mangaQueries';
import { cleanDescription, genMediaEmbed } from '../anilistGql/helperFunctions';
import { ColorResolvable, Interaction } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('manga')
        .setDescription('Information about the manga searched')
        .addStringOption((option: any) =>
            option
                .setName('name')
                .setDescription('Name of manga you want to query')
                .setRequired(true),
        ),
    async execute(interaction: Interaction) {
        if (interaction.isCommand()) {
            const endpoint = 'https://graphql.anilist.co';
            const variables = {
                mangaName: interaction.options.getString('name'),
            };
            const data = await request(endpoint, searchMangaQuery, variables);

            // Info from graphql endpoint
            const siteUrl: string = data.Media.siteUrl;
            const description: string = cleanDescription(
                data.Media.description,
            );
            const color: ColorResolvable = data.Media.coverImage.color;
            const coverImage: string = data.Media.coverImage.extraLarge;
            const title: string = data.Media.title.userPreferred;

            const embed = genMediaEmbed(
                color,
                title,
                siteUrl,
                description,
                coverImage,
            );

            await interaction.reply({ embeds: [embed] });
        }
    },
};
