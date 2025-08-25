const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Smaže více zpráv najednou.")
    .addIntegerOption(option =>
      option
        .setName("počet")
        .setDescription("Počet zpráv, které chceš smazat (1–100)")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const amount = interaction.options.getInteger("počet");

    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: "⚠️ Můžeš smazat jen 1 až 100 zpráv najednou.",
        ephemeral: true,
      });
    }

    await interaction.channel.bulkDelete(amount, true)
      .then(deleted => {
        interaction.reply({
          content: `🧹 Smazal jsem ${deleted.size} zpráv.`,
          ephemeral: true,
        });
      })
      .catch(err => {
        console.error(err);
        interaction.reply({
          content: "❌ Nepodařilo se smazat zprávy.",
          ephemeral: true,
        });
      });
  },
};
