export {};
const { SlashCommandBuilder } = require("@discordjs/builders");
import { request } from "graphql-request";
import { searchAnimeCharacterQuery } from "../anilistGql/queries/characterQueries";
import {
    cleanDescription,
    genCharacterEmbed,
} from "../anilistGql/helperFunctions";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("character")
        .setDescription("returns info about anime character")
        .addStringOption((option: any) =>
            option
                .setName("name")
                .setDescription("Name of anime character you want to query")
                .setRequired(true)
        ),
    async execute(interaction: any) {
        const endpoint: string = "https://graphql.anilist.co";
        const variables = {
            characterName: interaction.options.getString("name"),
        };
        const data = await request(
            endpoint,
            searchAnimeCharacterQuery,
            variables
        );
        // Info from graphql endpoint
        const name: string = data.Character.name.userPreferred;
        const image: string = data.Character.image.large;
        const age: string = data.Character.age;
        const gender: string = data.Character.gender;
        const siteUrl: string = data.Character.siteUrl;
        const description: string = cleanDescription(
            data.Character.description
        );
        const embed = genCharacterEmbed(
            name,
            image,
            age,
            gender,
            siteUrl,
            description
        );
        await interaction.reply({ embeds: [embed] });
    },
};
