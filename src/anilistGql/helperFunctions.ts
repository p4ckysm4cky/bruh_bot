const { MessageEmbed } = require('discord.js');

/**
 * Removes the tags from anilist descriptions
 *
 * @param description string that is given from anilist graphql
 */
export function cleanDescription(description: string): string {
    // This is used
    let cleanDescription = '';
    const matchTags = /<(\\|\/)?[a-z[A-Z]*>/g;
    if (description) {
        cleanDescription = description.replace(matchTags, '');
    }
    return cleanDescription;
}

export function genMediaEmbed(
    color: string,
    title: string,
    siteUrl: string,
    description: string,
    coverImage: string,
    episodes: any = null,
): any {
    const embed = new MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setURL(siteUrl)
        .setDescription(description)
        .setImage(coverImage)
        .setFooter({ text: 'Powered by anilist.co' });
    if (episodes) {
        embed.addFields({ name: `Episodes ${episodes}`, value: '\u200B' });
    }
    return embed;
}

export function genCharacterEmbed(
    name: string,
    image: string,
    age: any = null,
    gender: any = null,
    siteUrl: string,
    description: string,
): any {
    const embed = new MessageEmbed()
        .setColor('00C09A')
        .setTitle(name)
        .setThumbnail(image)
        .setURL(siteUrl)
        .setDescription(description)
        .setFooter({ text: 'Powered by anilist.co' });
    if (age) {
        embed.addFields({ name: '\u200B', value: `Age: ${age}`, inline: true });
    }
    if (gender) {
        embed.addFields({
            name: '\u200B',
            value: `${gender}`,
            inline: true,
        });
    }
    return embed;
}

export function genUserEmbed(
    name: string,
    about: string,
    avatar: string,
    siteUrl: string,
    animeMeanScore: number,
    episodesWatched: number,
    mangaMeanScore: number,
    chaptersRead: number,
) {
    const embed = new MessageEmbed()
        .setColor('00C09A')
        .setTitle(name)
        .setDescription(about)
        .setThumbnail(avatar)
        .setURL(siteUrl)
        .addFields({
            name: '\u200B',
            value: `📺 Average anime rating: ${animeMeanScore}`,
            inline: false,
        })
        .addFields({
            name: '\u200B',
            value: `📺 Total episodes watched: ${episodesWatched}`,
            inline: false,
        })
        .addFields({
            name: '\u200B',
            value: `📚 Average manga rating: ${mangaMeanScore}`,
            inline: false,
        })
        .addFields({
            name: '\u200B',
            value: `📚 Total chapters read: ${chaptersRead}`,
            inline: false,
        })
        .setFooter({ text: 'Powered by anilist.co' });
    return embed;
}
