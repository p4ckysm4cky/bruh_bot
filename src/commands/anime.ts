export {};
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
import { request } from "graphql-request";
import { searchAnimeQuery } from "../anilistGql/queries/animeQueries";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anime")
        .setDescription("Replies with anime info")
        .addStringOption((option: any) =>
            option
                .setName("name")
                .setDescription("Name of anime you want to query")
                .setRequired(true)
        ),
    async execute(interaction: any) {
        const endpoint: string = "https://graphql.anilist.co";
        const variables = { animeName: interaction.options.getString("name") };
        const data = await request(endpoint, searchAnimeQuery, variables);

        // Info from graphql endpoint
        const siteUrl: string = data.Media.siteUrl;
        const episodes: number = data.Media.episodes;
        const description: string = data.Media.description;
        const color: string = data.Media.coverImage.color;
        const coverImage: string = data.Media.coverImage.extraLarge;
        const title: string = data.Media.title.userPreferred;
        const bannerImage: string = data.Media.bannerImage;

        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setURL(siteUrl)
            .setDescription(description)
            .setImage(coverImage)
            .addFields({ name: `Episodes ${episodes}`, value: "\u200B" })
            .setFooter({ text: "Powered by anilist.co" });

        await interaction.reply({ embeds: [embed] });
    },
};
