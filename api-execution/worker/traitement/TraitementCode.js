const { exec } = require('child_process');
const traitementErreur = require('./TraitementErreur');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);

async function traitementCode(newDir,langage) {
    try {

        let output = '', error = '', status = 200;

        console.log(`Exécution du script avec le répertoire: ${newDir}`);

        const { stdout, stderr } = await execPromise(`sh ./executeCode.sh ${newDir}`);
        output = stdout;
        
        if (stderr) {
            error = await traitementErreur(stderr, langage);
            status = 400;
        }

        return { output, error, status };
    } catch (error) {
        console.error(`Erreur dans le traitement du code : ${error.message}`);
        throw error;
    }
}

module.exports = traitementCode;
