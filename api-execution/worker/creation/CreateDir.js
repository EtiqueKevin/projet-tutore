const util = require('util');
const { exec } = require('child_process');

const execPromise = util.promisify(exec);

async function createDir() {
    try {
        const { stdout, stderr } = await execPromise('mktemp -d');

        if (stderr) {
            console.error(`Erreur standard: ${stderr}`);
            throw new Error('Erreur lors de la création du répertoire temporaire.');
        }

        let newDir = stdout.trim();
        console.log(`Répertoire temporaire créé: ${newDir}`);
        return newDir;
    } catch (error) {

        console.error(`Erreur d'exécution: ${error.message}`);
        throw new Error('Erreur lors de la création du répertoire temporaire.');
    }
}

module.exports = createDir;
