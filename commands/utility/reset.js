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
    await interaction.reply({ embeds: [success], flags: MessageFlags.Ephemeral });
    const members = voice.channel.members ?? [];
    const voiceops = [];
    for (const player of members) {
      voiceops.push(player[1].voice.setMute(false));
      voiceops.push(player[1].voice.setDeaf(false));
    }
    voiceops.push(db.clear());
    await Promise.all(voiceops);
	},
};
