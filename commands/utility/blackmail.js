const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Blackmail')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { id } = interaction.targetMember;
    const blackmailed = await db.get('blackmailed') ?? [];
    blackmailed.push(id)
    await db.set('blackmailed', blackmailed);
    const embed = new EmbedBuilder().setDescription(`${interaction.targetMember.user.username} has been blackmailed!`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
