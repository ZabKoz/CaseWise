const { EmbedBuilder } = require("discord.js");
const translateText = require('../../utils/text/translator');

module.exports = {
  name: "ping",
  description: '🏓| Replies with the bot ping!',
  description_localizations: {
    "cs": "🏓| Odpovídá bot ping!",
    "de": "🏓| Antwortet mit dem Bot-Ping!",
    "pl": "🏓| Informacja o pingu!",
  },
  callback: async (client, interaction) => {
    // Gathering data on what language to use.
    const lang = await translateText(client, interaction);
    // 
    const emotes = await client.emoji;
    //
    let circles = {
      good: emotes.circleGood,
      okay: emotes.circleOkay,
      bad: emotes.circleBad,
    };
    //
    await interaction.deferReply({ ephemeral: true }).catch(() => { });
    //
    const pingingEmbed = new EmbedBuilder()
      .setColor(client.embedColors.default)
      .setDescription(lang.cmds.ping.pingingEmbed.description.replace(/<emoji>/g, emotes.loading.loading1))
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    // Sending an embed.
    const pinging = await interaction.followUp({ embeds: [pingingEmbed], });
    // Websocket latency
    const webLateacy = client.ws.ping;
    // Api latency
    const apiLateacy = pinging.createdTimestamp - interaction.createdTimestamp;
    // Total latency (This is just the basis for the color embed)
    const totalLateacy = webLateacy - apiLateacy;
    // Selecting an emoticon via the score (Websocket latency)
    const webEmoji = webLateacy <= 100 ? circles.good : webLateacy <= 200 ? circles.okay : circles.bad;
    // Selecting an emoticon via the score (Api latency)
    const apiEmoji = apiLateacy <= 200 ? circles.good : circles.bad;
    // Selecting an color via the score (Total latency)
    const embedColor = totalLateacy < 200 ? "Green" : totalLateacy < 500 ? "Yellow" : "Red";
    //
    const pingEmbed = new EmbedBuilder()
      .setColor(embedColor)
      .setFields(
        {
          name: lang.cmds.ping.pingEmbed.Field1,
          value: `${webEmoji} \`${webLateacy}ms\``,
        },
        {
          name: lang.cmds.ping.pingEmbed.Field2,
          value: `${apiEmoji} \`${apiLateacy}ms\``,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    //
    await interaction.editReply({ embeds: [pingEmbed], content: "\u200b", ephemeral: true, });
  },
};
