const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Meeting')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const embed = new EmbedBuilder().setDescription(`A meeting has been called - dead players will be muted.`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    const { guild } = interaction;
    const players = await db.get("players") ?? [];
    db.set('gamestate', 'meeting');
    for (const player of players) {
      const status = await db.get(player);
      if(status === 'dead' || status === 'blackmailed') {
        guild.members.edit(player, {
          deaf: false,
          mute: true,
        })
        if(status === 'blackmailed') db.delete(player);
      } else {
        guild.members.edit(player, {
          deaf: false,
          mute: false,
        })
      }
    }
	},
};
