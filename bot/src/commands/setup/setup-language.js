const { EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, PermissionFlagsBits } = require("discord.js");
const guildSchema = require('../../database/models/GuildSchema');
const translateText = require('../../utils/text/translator');

module.exports = {
    // deleted: true,
    name: "setup-language",
    description: "Configure the bot language for this server.",
    description_localizations: {
        "cs": "Konfigurace jazyka bota pro tento server.",
        "de": "Konfiguration der Bot-Sprache für diesen Server.",
        "pl": "Konfiguracja języka bota dla tego serwera.",
    },
    // devOnly: Boolean,
    // testOnly: true,
    options: [
        {
            name: 'lang',
            description: "Please choose the language I should use.",
            description_localizations: {
                "cs": "Vyberte prosím jazyk, který mám použít.",
                "de": "Bitte wählen Sie die Sprache, die ich verwenden soll.",
                "pl": "Wybierz język, którego powinienem użyć.",
            },
            required: true,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Česky',
                    value: 'cs'
                },
                {
                    name: 'Deutsch',
                    value: 'de'
                },
                {
                    name: 'English',
                    value: 'en'
                },
                {
                    name: 'Polski',
                    value: 'pl'
                },
            ]
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: async (client, interaction) => {
        // Gathering data on what language to use.
        let lang = await translateText(client, interaction);
        // Downloading from the option of what language has been selected
        const newLang = interaction.options.getString('lang');
        // Collecting information about the name of the language that was selected
        const langName = client.languages.get(newLang);
        // Embed asking if you want to make a change.
        const ConfirmEmbed = new EmbedBuilder()
            .setColor(client.embedColors.default)
            .setDescription(lang.cmds.setup_language.ConfirmEmbed.description.replace(/<langName>/g, langName.long_name))
            .setTimestamp()
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
            });
        // Answers to Embed to choose “yes” or “no”.
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(lang.commons.yes)
                    .setStyle(ButtonStyle.Success)
                    .setCustomId('change-yes')
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel(lang.commons.no)
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId('change-no')
            )
        // Sending an embed along with the buttons.
        await interaction.reply({ embeds: [ConfirmEmbed], components: [row] });
        // Collector counting time and user response.
        const collector = await interaction.channel.createMessageComponentCollector({
            time: 15000,
            ComponentType: ComponentType.Button
        });
        // Collecting information on what button was pressed.
        collector.on('collect', async (i) => {
            // If the “Yes” button has been pressed.
            if (i.customId === 'change-yes') {
                // Checking whether the button was pressed by the person calling the command.
                if (i.user.id !== interaction.user.id) {
                    // Embed indicating that the user cannot respond to this command.
                    const badUserEmbed1 = new EmbedBuilder()
                        .setColor(client.embedColors.red)
                        .setDescription(lang.cmds.setup_language.badUserEmbed.description.replace(/<userName>/g, interaction.user.name))
                        .setTimestamp()
                        .setFooter({
                            text: `Requested by ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        });
                    // Sending messages.
                    await interaction.reply({ embed: [badUserEmbed1], ephemeral: true });
                };
                // 
                i.deferUpdate();
                // Changing the information in the database.
                try {
                    await guildSchema.findOneAndUpdate({
                        guildId: interaction.guild.id,
                        language: newLang,
                    });
                    // Using the 'translateText' function to reload a new language for the server.
                    let lang = await translateText(client, interaction);
                    // Embed.
                    const confirmedEmbed = new EmbedBuilder()
                        .setColor(client.embedColors.success)
                        .setDescription(lang.cmds.setup_language.confirmedEmbed.description.replace(/<langName>/g, langName.long_name))
                        .setTimestamp()
                        .setFooter({
                            text: `Requested by ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        });
                    // Sending messages.
                    await interaction.editReply({ embeds: [confirmedEmbed], components: [] });
                } catch (err) {
                    const errorEmbed = new EmbedBuilder()
                        .setColor(client.embedColors.success)
                        .setDescription(lang.cmds.setup_language.errorEmbed.description)
                        .setTimestamp()
                        .setFooter({
                            text: `Requested by ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        });
                    // Sending messages.
                    await interaction.editReply({ embeds: [errorEmbed], components: [] });
                    console.log(err);
                }
                //
            } else if (i.customId === 'change-no') {
                // Checking whether the button was pressed by the person calling the command.
                if (i.user.id !== interaction.user.id) {
                    // Embed indicating that the user cannot respond to this command.
                    const badUserEmbed2 = new EmbedBuilder()
                        .setColor(client.embedColors.red)
                        .setDescription(lang.cmds.setup_language.badUserEmbed.description.replace(/<userName>/g, interaction.user.name))
                        .setTimestamp()
                        .setFooter({
                            text: `Requested by ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL(),
                        });
                    // Sending messages.
                    await interaction.reply({ embed: [badUserEmbed2], ephemeral: true });
                }
                // 
                i.deferUpdate();
                // 
                const cancelledEmbed = new EmbedBuilder()
                    .setColor(client.embedColors.red)
                    .setDescription(lang.cmds.setup_language.cancelledEmbed.description)
                    .setTimestamp()
                    .setFooter({
                        text: `Requested by ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL(),
                    });
                // 
                await interaction.editReply({ embeds: [cancelledEmbed], components: [] });
            };
        });

    },
}