const { SlashCommandBuilder, InteractionContextType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription("Resets game state and unmutes/undeafens everyone.")
    .setContexts(InteractionContextType.Guild),
	async execute(interaction, db) {
    const { voice } = interaction.member;
    const err = new EmbedBuilder().setDescription(`You must be in a voice channel to use this command.`);
    const success = new EmbedBuilder().setDescription(`Game state has been reset!`);
    if(voice.channel === null) {
      await interaction.reply({ embeds: [err], flags: MessageFlags.Ephemeral });
      return;
    }
    for (const player of voice.channel.members) {
      await player[1].voice.setMute(false);
      await player[1].voice.setDeaf(false);
    }
    await db.clear();
    await interaction.reply({ embeds: [success], flags: MessageFlags.Ephemeral });
	},
};
