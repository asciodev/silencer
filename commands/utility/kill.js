const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Kill')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { targetMember } = interaction;
    const embed = new EmbedBuilder().setDescription(`${targetMember.user.username} has been killed!`);
    interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    db.set(targetMember.id, 'dead');
    if((await db.get('gamestate')) === 'meeting') {
      interaction.guild.members.edit(targetMember.id, {
        mute: true,
      });
    }
	},
};
