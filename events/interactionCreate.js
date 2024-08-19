module.exports = async (client, interaction) => {
    if (!interaction.isCommand() && !interaction.isButton()) return;

    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande!', ephemeral: true });
        }
    } else if (interaction.isButton()) {
        // Vous pouvez ajouter ici la gestion spécifique des boutons
        if (interaction.customId === 'start_reservation') {
            // Implémentez la logique de réservation ici
            console.log('Bouton de réservation cliqué');
        }
    }
};
