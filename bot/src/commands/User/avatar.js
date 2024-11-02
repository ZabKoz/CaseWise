const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Get the avatar of a user or yourself.",
    description_localizations: {
        "pl": "Uzyskaj awatar użytkownika lub swój własny.",
    },
    options: [
        {
            name: 'user',
            description: "Specify the user you want to get the avatar from (if you want yours, don't put anything).",
            description_localizations: {
                "pl": "Określ użytkownika, od którego chcesz pobrać awatar (jeśli chcesz swój, nie wpisuj nic).",
            },
            required: false,
            type: ApplicationCommandOptionType.User,
        },
    ],
    // devOnly: Boolean,
    // testOnly: true,
    // deleted: true,

    callback: async (client, interaction) => {
        // Getting information about the user marked in the “User” option or the person calling the command
        const user = interaction.options.getUser('user') || interaction.user;
        //
        const pingEmbed = new EmbedBuilder()
            .setColor(16716947)
            .setTitle(`${user.tag}'s avatar`)
            .setFields(
                {
                    name: "PNG",
                    value: `[\`LINK\`](${user.displayAvatarURL().replace("gif", "png").replace("gif", "jpg").replace("gif", "webp")})`,
                    inline: true
                },
                {
                    name: "JPEG",
                    value: `[\`LINK\`](${user.displayAvatarURL().replace("png", "jpg").replace("gif", "jpg")})`,
                    inline: true
                },
                {
                    name: "WEBP",
                    value: `[\`LINK\`](${user.displayAvatarURL().replace("png", "webp").replace("gif", "webp")})`,
                    inline: true
                },
            )
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });
        //
        await interaction.reply({ embeds: [pingEmbed], ephemeral: false, });
    }
};