module.exports = async (client) => {
    console.log(`Connecté en tant que ${client.user.tag}!`);

    // Afficher le statut du bot ou exécuter des vérifications initiales
    client.user.setPresence({
        activities: [{ name: 'avec les réservations', type: 'PLAYING' }],
        status: 'online'
    });

    // Exemple : connexion à une base de données ou initialisation d'autres services
    // connectToDatabase();

    // Logique supplémentaire si nécessaire
    console.log('Le bot est prêt et opérationnel!');

    // Exemple: Mise à jour des commandes slash à l'échelle du serveur
    const rest = new REST({ version: '9' }).setToken(client.token);
    try {
        console.log('Démarrage de la mise à jour des commandes de l\'application (/)');
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), 
            { body: client.commands.map(command => command.data.toJSON()) }
        );
        console.log('Commandes de l\'application (/) mises à jour avec succès.');
    } catch (error) {
        console.error('Erreur lors de la mise à jour des commandes:', error);
    }
};
