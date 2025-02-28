const { SlashCommandBuilder, InteractionContextType, MessageFlags, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription("Resets game state and unmutes/undeafens everyone.")
    .setContexts(InteractionContextType.Guild),
	async execute(interaction, db) {
    const { voice } = interaction.member;
    const { guild } = interaction;
    const err = new EmbedBuilder().setDescription(`You must be in a voice channel to use this command.`);
    const success = new EmbedBuilder().setDescription(`Game state has been reset!`);
    if(voice.channel === null) {
      await interaction.reply({ embeds: [err], flags: MessageFlags.Ephemeral });
      return;
    }
    await interaction.reply({ embeds: [success], flags: MessageFlags.Ephemeral });
    const members = voice.channel?.members ?? [];
    await db.clear();
    const players = [];
    for (const player of members) {
      guild.members.edit(player[0], {
        deaf: false,
        mute: false,
      });
      players.push(player[0]);
    }
    db.set('players', players);
	},
};
