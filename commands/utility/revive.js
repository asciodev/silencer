const { ContextMenuCommandBuilder, ApplicationCommandType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
    .setName('Revive')
    .setType(ApplicationCommandType.User),
	async execute(interaction, db) {
    const { id } = interaction.targetMember;
    const dead = (await db.get('dead') ?? []).filter(deadId => deadId !== id);
    await db.set('dead', dead);

    const embed = new EmbedBuilder().setDescription(`${interaction.targetMember.user.username} has been revived!`);
    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
	},
};
