const { exec } = require('child_process');
const path = require('path');
const util = require('util');

async function traitementCode(newDir) {
    try {
        const scriptPath = path.join(__dirname, '../executeCode.sh');
        console.log(`Exécution du script avec le répertoire: ${newDir}`);

        const { stdout, stderr } = await execPromise(`sh ${scriptPath} ${newDir}`);

        if (stderr) {
            throw new Error(`Erreur standard: ${stderr}`);
        }

        console.log('Résultat de l\'exécution:', stdout.trim());
        return stdout.trim();  // Retourner le résultat de l'exécution
    } catch (error) {
        console.error(`Erreur dans le traitement du code : ${error.message}`);
        throw error;
    }
}

const execPromise = util.promisify(exec);
module.exports = traitementCode;
