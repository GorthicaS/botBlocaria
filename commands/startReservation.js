const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('startreservation')
        .setDescription('Commence le processus de réservation pour un utilisateur.'),
    async execute(interaction) {
        const guild = interaction.guild;
        const member = interaction.member;
        const staffRoleId = '1274801098921611424';  // Utilisez ici l'ID du rôle Staff Minecraft

        // Création d'un canal privé
        const channel = await guild.channels.create(`réservation-${member.user.username}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: guild.id,
                    deny: [Permissions.FLAGS.VIEW_CHANNEL],
                },
                {
                    id: member.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                },
                {
                    id: staffRoleId,  // Utilisez l'ID du rôle Staff ici
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.READ_MESSAGE_HISTORY],
                }
            ],
        });

        channel.send("Bienvenue dans votre session de réservation. Veuillez sélectionner un outil ou une ferme à louer.");
    }
};
