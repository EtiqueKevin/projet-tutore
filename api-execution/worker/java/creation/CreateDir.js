const util = require('util');
const { exec } = require('child_process');

// Utilisation de promisify pour rendre exec asynchrone avec await
const execPromise = util.promisify(exec);

async function createDir() {
    try {
        // Exécution de la commande mktemp -d pour créer un répertoire temporaire
        const { stdout, stderr } = await execPromise('mktemp -d');

        // Vérification de l'erreur standard
        if (stderr) {
            console.error(`Erreur standard: ${stderr}`);
            throw new Error('Erreur lors de la création du répertoire temporaire.');
        }

        // Traitement du stdout pour obtenir le répertoire
        let newDir = stdout.trim(); // trim() pour enlever les espaces ou les nouvelles lignes
        console.log(`Répertoire temporaire créé: ${newDir}`);
        return newDir;
    } catch (error) {
        // Gestion des erreurs d'exécution
        console.error(`Erreur d'exécution: ${error.message}`);
        throw new Error('Erreur lors de la création du répertoire temporaire.');
    }
}

module.exports = createDir;
