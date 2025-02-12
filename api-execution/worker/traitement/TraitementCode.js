const { exec } = require('child_process');
const path = require('path');
const util = require('util');

async function traitementCode(newDir,langage) {
    try {
        let stdout, stderr ;

        console.log(`Exécution du script avec le répertoire: ${newDir}`);

        switch (langage) {
            case 'java':
                ({ stdout, stderr } = await execPromise(`cd java && sh ./executeCode.sh ${newDir}`));
                break;
            case 'python':
                ({ stdout, stderr } = await execPromise(`cd python && sh ./executeCode.sh ${newDir}`));
                break;
            default:
        }


        if (stderr) {
            throw new Error(`Erreur standard: ${stderr}`);
        }

        console.log('Résultat de l\'exécution:', stdout.trim());
        return stdout.trim();
    } catch (error) {
        console.error(`Erreur dans le traitement du code : ${error.message}`);
        throw error;
    }
}

const execPromise = util.promisify(exec);
module.exports = traitementCode;
