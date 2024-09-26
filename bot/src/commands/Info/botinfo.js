const { EmbedBuilder, version } = require("discord.js");

module.exports = {
    name: "botinfo",
    description: "Information about the bot!",
    description_localizations: {
        "pl": "Informacje na temat bota!",
    },
    // devOnly: Boolean,
    // testOnly: true,
    // deleted: true,

    callback: async (client, interaction) => {
        //
        const totalGuilds = client.guilds.cache.size.toLocaleString();
        //
        const totalMembers = client.users.cache.size.toLocaleString();
        //
        const totalChannels = client.channels.cache.size.toLocaleString();
        //
        const pingEmbed = new EmbedBuilder()
            .setThumbnail(interaction.client.user.displayAvatarURL({ size: 64 }))
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            })
            .setTimestamp()
            .setFields(
                {
                    name: "_____ \n\n│General",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "🤖┆Bot name",
                    value: `\`${client.user.username}\``,
                    inline: true,
                },
                {
                    name: "🆔┆Bot id",
                    value: `\`${client.user.id}\``,
                    inline: true,
                },
                {
                    name: "🔧┆Bot owner",
                    value: `<@!911417843948609538>`,
                    inline: true,
                },
                {
                    name: "🔧┆Bot developer",
                    value: `NONE`,
                    inline: true,
                },
                {
                    name: "🌐┆Servers",
                    value: `\`${totalGuilds}\` servers`,
                    inline: true,
                },
                {
                    name: "👥┆Members",
                    value: `\`${totalMembers}\` members`,
                    inline: true,
                },
                {
                    name: "📺┆Channels",
                    value: `\`${totalChannels}\` channels`,
                    inline: true,
                },
                {
                    name: "📅┆Created",
                    value: `<t:${Math.round(client.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },

                {
                    name: "_____ \n\n│System",
                    value: `_____`,
                    inline: false,
                },
                {
                    name: "🏷┆Bot Version",
                    value: `\`${require(`${process.cwd()}/package.json`).version}\``,
                    inline: true,
                },
                {
                    name: "🏷┆Node.js Version",
                    value: `\`${process.version}\``,
                    inline: true,
                },
                {
                    name: "📂┆Discord.js Version",
                    value: `\`${version}\``,
                    inline: true,
                },
            );
        //
        await interaction.reply({ embeds: [pingEmbed], content: "\u200b", ephemeral: true, });
    },
};