const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Round')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const embed = new EmbedBuilder().setDescription(`A round has been called - living players will be deafened.`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    const { voice } = interaction.targetMember;
    const members = voice.channel.members ?? [];
    const voiceops = [];
    for (const player of members) {
      const status = await db.get(player[0]);
      if(status === 'dead') {
        voiceops.push(player[1].voice.setMute(false));
        voiceops.push(player[1].voice.setDeaf(false));
      } else {
        voiceops.push(player[1].voice.setMute(true));
        voiceops.push(player[1].voice.setDeaf(true));
        voiceops.push(db.delete(player[0]));
      }
    }
    await Promise.all(voiceops);
	},
};
