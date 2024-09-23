const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  description_localizations: {
    "en-US": "🏓| Replies with the bot ping!",
    "pl": "🏓| Informacja o pingu!",
  },

  callback: async (client, interaction) => {
    //
    let circles = {
      good: "<a:Hight:1287602176038015080>",
      okay: "<a:Mid:1287602164100894731>",
      bad: "<a:Low:1287602155355639848>",
    };
    //
    await interaction.deferReply({ ephemeral: true }).catch(() => { });
    //
    const pinging = await interaction.followUp({
      embeds: [
        {
          color: 16716947,
          description: `<a:loading:1287629573378543656> Calculating ping...`,
        },
      ],
    });
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
      .setTimestamp()
      .setFooter({ text: `Verification time` })
      .setFields(
        {
          name: "Websocket latency",
          value: `${webEmoji} \`${webLateacy}ms\``,
        },
        {
          name: "API latency",
          value: `${apiEmoji} \`${apiLateacy}ms\``,
        }
      );
    //
    await interaction.editReply({ embeds: [pingEmbed], content: "\u200b", ephemeral: true, });
  },
};
