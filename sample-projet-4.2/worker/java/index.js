const express = require('express');
const { exec } = require('child_process');
const util = require('util');
const createFiles = require("./creation/CreateFiles");
const traitementCode = require("./traitement/TraitementCode");
const createDir = require("./creation/CreateDir");

const app = express();
const PORT = 4000;

app.use(express.json());

// Promisifier exec pour l'utiliser avec await
const execPromise = util.promisify(exec);


app.post('/validate', async (req, res) => {
    try {
        // Vérification du code source et du test
        if (!req.body.codes || !req.body.testCode) {
            return res.status(400).json({ error: 'Code source ou test manquant dans le body.' });
        }

        // Créer un répertoire temporaire
        let newDir = await createDir(res)

        // Créer les fichiers
        const fileCreationCommands = createFiles(newDir, req.body);  // Passer newDir et req.body à createFiles
        await execPromise(fileCreationCommands);  // Utilisation de execPromise ici
        console.log('Fichiers créés avec succès');

        // Traitement du code source et du test
        const script_exec = await traitementCode(newDir)
        // Envoi du résultat au micro-service de validation
        res.status(200).json({
            result: {
                "out": script_exec,
                "err": ''
            }
        });
    } catch (e) {
        console.error('Erreur dans le traitement de la requête :', e.message);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

app.listen(PORT, () => {
    console.log(`Worker en cours d'exécution sur le port ${PORT}`);
});
