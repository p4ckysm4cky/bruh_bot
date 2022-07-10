export {};
const axios = require("axios").default;
const { SlashCommandBuilder } = require("@discordjs/builders");

async function querySafeBooru(tags: string[]) {
    const endpoint = new URL(
        "https://safebooru.org/index.php?page=dapi&s=post&q=index"
    );
    // Only return first result
    endpoint.searchParams.append("limit", "1");
    // return json
    endpoint.searchParams.append("json", "1");
    let tagsUrl: string = "";
    for (let [index, tag] of tags.entries()) {
        if (index !== 0) {
            tagsUrl += " ";
        }
        tagsUrl += tag;
    }
    endpoint.searchParams.append("tags", tagsUrl);
    let response = await axios.get(endpoint.toString());
    if (!Array.isArray(response.data)) {
        throw "No Results Found";
    }
    let directory = response.data[0].directory;
    let image = response.data[0].image;
    return {
        directory,
        image,
    };
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("safebooru")
        .setDescription("Replies with image of the first result")
        .addStringOption((option: any) =>
            option
                .setName("tags")
                .setDescription("comma separated tags")
                .setRequired(true)
        ),
    async execute(interaction: any) {
        const message: string = interaction.options.getString("tags");
        try {
            let { directory, image } = await querySafeBooru(message.split(","));
            let imageUrl: string = `https://safebooru.org/images/${directory}/${image}`;
            await interaction.reply(`${imageUrl}`);
        } catch (e) {
            await interaction.reply({
                content: `${e}`,
                ephemeral: true,
            });
        }
    },
};
