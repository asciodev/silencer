const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Meeting')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const embed = new EmbedBuilder().setDescription(`A meeting has been called - dead and blackmailed players will be muted.`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    const { voice } = interaction.targetMember;
    const members = voice.channel.members ?? [];
    const voiceops = [];
    for (const player of members) {
      const status = await db.get(player[0]);
      if(status === 'dead' || status === 'blackmailed') {
        voiceops.push(player[1].voice.setMute(true));
        voiceops.push(player[1].voice.setDeaf(false));
      } else {
        voiceops.push(player[1].voice.setMute(false));
        voiceops.push(player[1].voice.setDeaf(false));        
      }
    }
    await Promise.all(voiceops);
	},
};
