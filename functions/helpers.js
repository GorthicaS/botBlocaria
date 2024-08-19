const fs = require('fs');
const path = require('path');

// Fonction pour générer un contrat basé sur un modèle
function generateContract(details) {
    const template = `# Contrat de Location d’un ${details.nom} dans Minecraft, sur le serveur BLOCARIA
## Entre les soussignés :
- Propriétaire:
Pseudo Discord : [Pseudo Propriétaire]
Pseudo Minecraft : [Pseudo Propriétaire]

- Locataire:
Pseudo Discord : ${details.pseudoDiscord}
Pseudo Minecraft : ${details.pseudoMinecraft}

## Objet
- Le présent contrat a pour objet la location d’un ${details.nom}, ci-après dénommé "l'Objet". La location est conclue pour une durée initiale de ${details.duree} heures à compter de la remise de l'Objet au Locataire. Toute heure commencée est due en intégralité.
- Le prix de la location est fixé à ${details.prix} or par heure.
- Le Locataire est tenu de restituer l'Objet dans le même état que lors de sa réception, c'est-à-dire au même niveau minimum d'usage, qui est au moment de la location de : ${details.usageMin} utilisations.
- Le paiement sera effectué intégralement au début de la période de location. En cas d'heures supplémentaires entamées, le Locataire s'engage à payer une nouvelle heure au tarif de ${details.prix} or.

## Obligations du Locataire
- Utiliser l’Objet uniquement dans le cadre du jeu Minecraft.
- Ne pas prêter, vendre ou sous-louer l’Objet à un tiers.
- Restituer l’Objet à l’issue de la période de location.
- Assurer l'entretien et la réparation de l'Objet à ses frais en cas de détérioration durant la période de location.

## Litiges
Les parties s'engagent à résoudre à l'amiable tout différend lié à l'exécution du présent contrat. À défaut de règlement amiable, le litige sera soumis à la modération du serveur Blocaria.

*Pour accepter le contrat, le Locataire doit faire suivre ce message de la mention "lu et accepté" sans modification de ce dernier.*`;
    return template;
}

// Fonction pour mettre à jour l'inventaire après une réservation
function updateInventory(itemName, quantity) {
    const inventoryPath = path.join(__dirname, '../data/inventory.json');
    const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));
    
    const item = inventory.find(item => item.nom === itemName);
    if (item && item.quantite >= quantity) {
        item.quantite -= quantity; // Mettre à jour la quantité
        fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 2)); // Sauvegarder les modifications
        return true;
    }
    return false;
}

module.exports = {
    generateContract,
    updateInventory
};
