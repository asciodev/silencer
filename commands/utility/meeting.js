const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Meeting')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { voice } = interaction.targetMember;
    const dead = await db.get('dead') ?? [];
    const blackmailed = await db.get('blackmailed') ?? [];
    for (const player of voice.channel.members) {
      if(dead.includes(player[0]) || blackmailed.includes(player[0])) {
        await player[1].voice.setMute(true);
        await player[1].voice.setDeaf(false);
      } else {
        await player[1].voice.setMute(false);
        await player[1].voice.setDeaf(false);        
      }
    }
    await db.delete('blackmailed');
    const embed = new EmbedBuilder().setDescription(`A meeting has been called!`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
