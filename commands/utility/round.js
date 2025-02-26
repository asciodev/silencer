const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Round')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { voice } = interaction.targetMember;
    const dead = await db.get('dead') ?? [];
    for (const player of voice.channel.members) {
      if(dead.includes(player[0])) {
        await player[1].voice.setMute(false);
        await player[1].voice.setDeaf(false);
      } else {
        await player[1].voice.setMute(true);
        await player[1].voice.setDeaf(true);        
      }
    }
    const embed = new EmbedBuilder().setDescription(`Meeting time is over - time to deafen!`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
