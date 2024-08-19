const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Configuration des identifiants et des clés
const token = 'TOKEN';
const clientId = '1275016785464135724';
const guildId = '1187791198237229077';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.commands = new Collection();
const commands = []; // Assurez-vous d'avoir initialisé vos commandes ici.

client.once('ready', async () => {
    console.log(`Bot connecté en tant que ${client.user.tag}!`);

    const rest = new REST({ version: '9' }).setToken(token);

    try {
        console.log('Démarrage de la mise à jour des commandes de l\'application (/)');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands.map(command => command.data.toJSON()) });
        console.log('Commandes de l\'application (/) mises à jour avec succès.');
    } catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Une erreur s\'est produite lors de l\'exécution de cette commande!', ephemeral: true });
    }
});

// Connexion du bot
client.login(token);
