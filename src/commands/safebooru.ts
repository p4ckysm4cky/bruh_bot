export {};
const axios = require('axios').default;
const { SlashCommandBuilder } = require('@discordjs/builders');

async function querySafeBooru(tags: string[]) {
    const endpoint = new URL(
        'https://safebooru.org/index.php?page=dapi&s=post&q=index',
    );
    // Only return first result
    endpoint.searchParams.append('limit', '1');
    // return json
    endpoint.searchParams.append('json', '1');
    let tagsUrl = '';
    for (const [index, tag] of tags.entries()) {
        if (index !== 0) {
            tagsUrl += ' ';
        }
        tagsUrl += tag;
    }
    endpoint.searchParams.append('tags', tagsUrl);
    const response = await axios.get(endpoint.toString());
    if (!Array.isArray(response.data)) {
        throw 'No Results Found';
    }
    const directory = response.data[0].directory;
    const image = response.data[0].image;
    return {
        directory,
        image,
    };
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('safebooru')
        .setDescription('Image of the first result found on safebooru')
        .addStringOption((option: any) =>
            option
                .setName('tags')
                .setDescription('comma separated tags')
                .setRequired(true),
        ),
    async execute(interaction: any) {
        const message: string = interaction.options.getString('tags');
        try {
            const { directory, image } = await querySafeBooru(
                message.split(','),
            );
            const imageUrl = `https://safebooru.org/images/${directory}/${image}`;
            await interaction.reply(`${imageUrl}`);
        } catch (e) {
            await interaction.reply({
                content: `${e}`,
            });
        }
    },
};
