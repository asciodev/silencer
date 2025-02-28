const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Round')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const embed = new EmbedBuilder().setDescription(`A round has been called - living players will be deafened.`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    const { voice } = interaction.targetMember;
    const { guild } = interaction;
    db.set('gamestate', 'round');
    const players = await db.get("players") ?? [];
    for (const player of players) {
      const status = await db.get(player);
      if(status === 'dead') {
        guild.members.edit(player, {
          deaf: false,
          mute: false,
        })
      } else {
        guild.members.edit(player, {
          deaf: true,
          mute: true,
        })
      }
    }
	},
};
