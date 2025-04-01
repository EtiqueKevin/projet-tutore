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
const PYTHON_STREAM = 'python_stream';
const RESULT_STREAM_KEY = 'result_python_stream';

const execPromise = util.promisify(exec);

// Fonction pour traiter le message reçu
async function traiterMessage(message) {
    const {data} = message[0].message;
    const parsedData = JSON.parse(data);
    const {codes, testCode, fileTest} = parsedData;
    
    console.log(`🔄 Traitement de la requête`);
    
    let output = '', error = '', status = 200;
    
    try {
        // Création du répertoire temporaire et des fichiers
        const newDir = await createDir();
        await execPromise(createFiles(newDir, {codes, testCode, fileTest}, 'python'));
        
        // Utilisation de la fonction traitementCode
        const result = await traitementCode(newDir, 'python');
        output = result.output;
        error = result.error;
        status = result.status;

        Logger.info(`✅ Résultat envoyé pour la requête`);
    } catch (err) {
        error = err.stdout || err.stderr || err.message;
        error = await traitementErreur(error, 'python');
        status = err instanceof Error ? 500 : 400;
        Logger.error(`❌ Erreur: ${error}`);
    }
    
    return {output, error, status};
}

async function startWorker() {
    const redisClient = redis.createClient({url: REDIS_URL});
    
    redisClient.on('error', (err) => console.error('❌ Erreur Redis:', err));
    
    await redisClient.connect();
    console.log('✅ Connexion à Redis réussie');
    
    try {
        while (true) {
            try {
                // Lecture des messages du stream
                const messages = await redisClient.xRead(
                    [{key: PYTHON_STREAM, id: '0'}],
                    {block: 0, count: 1}
                );
                
                const id = messages[0].messages[0].id;
                
                // Supprime le message du stream
                await redisClient.xDel(PYTHON_STREAM, id);
                
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