const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Revive')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { id } = interaction.targetMember;
    await db.delete(id);
    const embed = new EmbedBuilder().setDescription(`${interaction.targetMember.user.username} has been revived!`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
