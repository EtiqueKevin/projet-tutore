const redis = require('redis');
const {exec} = require('child_process');
const util = require('util');
const createFiles = require("../creation/CreateFiles");
const traitementCode = require("../traitement/TraitementCode");
const createDir = require("../creation/CreateDir");
const Logger = require('../logger');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const JAVA_STREAM = 'java_stream';
const RESULT_STREAM_KEY = 'result_java_stream';

const execPromise = util.promisify(exec);

async function startWorker() {
    const redisClient = redis.createClient({url: REDIS_URL});

    redisClient.on('error', (err) => console.error('❌ Redis Client Error:', err));

    await redisClient.connect();
    console.log('✅ Connexion à Redis réussie');

    try {
        while (true) {
            try {

                const messages = await redisClient.xRead(
                    [{key: 'java_stream', id: '0'}],
                    {block: 0, count: 1}
                );

                const id = messages[0].messages[0].id;
                const message = messages[0].messages;
                const {data} = message[0].message;
                const parsedData = JSON.parse(data);

                const codes = parsedData.codes;
                const testCode = parsedData.testCode;
                const fileTest = parsedData.fileTest;
                console.log(`🔄 Traitement de la requête`);

                await redisClient.xDel('java_stream', id);

                let output = '', error = '', status = 200;

                try {
                    let newDir = await createDir();
                    await execPromise(createFiles(newDir, {codes, testCode, fileTest}));
                    output = await traitementCode(newDir, 'java');
                    const match = output.replace(/\n\t.*?(?=\n\t|$)/g, "");
                    output = match
                    Logger.info(`✅ Résultat envoyé pour la requête `);
                } catch (err) {
                    error = err.message;
                    status = err.code;
                    Logger.error(`❌ Erreur dans le traitement: ${error}`);
                }

                const resultMessage = {output, error, status};
                await redisClient.xAdd(RESULT_STREAM_KEY, '*', {message: JSON.stringify(resultMessage)});


            } catch (err) {
                //console.error('❌ Erreur lors de la réception du message:', err);
                // Logger.error('❌ Erreur lors de la lecture du stream:', err);
            }
        }
    } catch (err) {
        Logger.error('❌ Erreur critique:', err.message);
        process.exit(1);
    }
}

process.on('SIGINT', async () => {
    console.log('🔴 Arrêt du worker...');
    process.exit(0);
});

startWorker().catch((err) => console.error('❌ Erreur dans le worker:', err));
