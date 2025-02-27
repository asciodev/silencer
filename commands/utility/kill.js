const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Kill')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { id } = interaction.targetMember;
    await db.set(id, 'dead');
    const embed = new EmbedBuilder().setDescription(`${interaction.targetMember.user.username} has been killed!`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
