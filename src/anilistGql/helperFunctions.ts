const { MessageEmbed } = require("discord.js");

/**
 * Removes the tags from anilist descriptions
 *
 * @param description string that is given from anilist graphql
 */
export function cleanDescription(description: string): string {
    // This is used
    const matchTags: RegExp = /\<(\\|\/)?[a-z[A-Z]*\>/g;
    const cleanDescription = description.replace(matchTags, "");
    return cleanDescription;
}

export function genAnimeEmbed(
    color: string,
    title: string,
    siteUrl: string,
    description: string,
    coverImage: string,
    episodes: number
): any {
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setURL(siteUrl)
        .setDescription(description)
        .setImage(coverImage)
        .setFooter({ text: "Powered by anilist.co" });
    if (episodes) {
        embed.addFields({ name: `Episodes ${episodes}`, value: "\u200B" });
    }
    return embed;
}
