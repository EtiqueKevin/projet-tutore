const redis = require('redis');
const {exec} = require('child_process');
const util = require('util');
const createFiles = require("../creation/CreateFiles");
const traitementCode = require("../traitement/TraitementCode");
const traitementErreur = require('../traitement/TraitementErreur');
const createDir = require("../creation/CreateDir");
const Logger = require('../logger');

// Configuration Redis
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const JAVA_STREAM = 'java_stream';
const RESULT_STREAM_KEY = 'result_java_stream';

// Convertir exec en une fonction qui retourne une promesse
// Cela permet d'utiliser async/await pour exécuter des commandes shell
const execPromise = util.promisify(exec);

// Fonction pour traiter le message reçu
// Cette fonction va créer un répertoire temporaire, y créer les fichiers nécessaires,
// exécuter les tests et retourner le résultat
async function traiterMessage(message) {
    const {data} = message[0].message;
    const parsedData = JSON.parse(data);
    const {codes, testCode, fileTest} = parsedData;
    
    console.log(`🔄 Traitement de la requête`);
    
    let output = '', error = '', status = 200;
    
    try {
        // Création du répertoire temporaire et des fichiers
        const newDir = await createDir();
        await execPromise(createFiles(newDir, {codes, testCode, fileTest}, 'java'));
        
        // Utilisation de la fonction traitementCode
        const result = await traitementCode(newDir, 'java');
        output = result.output;
        error = result.error;
        status = result.status;

        Logger.info(`✅ Résultat envoyé pour la requête`);
    } catch (err) {
        error = err.stdout || err.stderr || err.message;
        error = traitementErreur(error, 'java');
        status = err instanceof Error ? 500 : 400;
        Logger.error(`❌ Erreur: ${error}`);
    }
    
    return {output, error, status};
}

// Démarre le worker et écoute les messages du stream Redis
async function startWorker() {
    // Initialisation du client Redis
    const redisClient = redis.createClient({url: REDIS_URL});
    
    redisClient.on('error', (err) => console.error('❌ Erreur Redis:', err));
    
    await redisClient.connect();
    console.log('✅ Connexion à Redis réussie');
    
    try {
        while (true) {
            try {
                // Lecture des messages du stream
                const messages = await redisClient.xRead(
                    [{key: JAVA_STREAM, id: '0'}],
                    {block: 0, count: 1}
                );
                
                const id = messages[0].messages[0].id;
                
                // Supprime le message du stream
                await redisClient.xDel(JAVA_STREAM, id);
                
                // Traitement du message
                const result = await traiterMessage(messages[0].messages);
                
                // Envoi du résultat
                await redisClient.xAdd(RESULT_STREAM_KEY, '*', {
                    message: JSON.stringify(result)
                });
                
            } catch (err) {
                Logger.error(`❌ Erreur lors de la lecture du stream: ${err.message}`);
            }
        }
    } catch (err) {
        Logger.error('❌ Erreur critique:', err.message);
        process.exit(1);
    }
}

// Gestion de l'arrêt
process.on('SIGINT', async () => {
    console.log('🔴 Arrêt du worker...');
    process.exit(0);
});

startWorker().catch((err) => console.error('❌ Erreur dans le worker:', err));