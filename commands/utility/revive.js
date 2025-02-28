const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Revive')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { targetMember } = interaction;
    const embed = new EmbedBuilder().setDescription(`${targetMember.user.username} has been revived!`);
    interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    db.delete(targetMember.id);
    if((await db.get('gamestate')) === 'meeting') {
      interaction.guild.members.edit(targetMember.id, {
        mute: false,
      });
    }
	},
};
