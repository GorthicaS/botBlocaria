const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updateinventory')
        .setDescription('Mise à jour de l\'inventaire des outils et fermes disponibles'),
    async execute(interaction) {
        const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/inventory.json'), 'utf8'));
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Inventaire des Outils et Fermes')
            .setDescription('Cliquez sur le bouton ci-dessous pour faire une réservation.');

        inventory.forEach(item => {
            const statusIcon = item.disponible ? "🟢" : "🔴";
            const statusText = item.disponible ? "Disponible" : "Indisponible";
            embed.addField(item.nom, `${statusIcon} ${statusText} - Quantité: ${item.quantite}`, true);
        });

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('start_reservation')
                    .setLabel('Faire une Réservation')
                    .setStyle('PRIMARY')
                    .setDisabled(inventory.every(item => item.quantite === 0))
            );

        await interaction.reply({ embeds: [embed], components: [row], ephemeral: false });
    }
};
