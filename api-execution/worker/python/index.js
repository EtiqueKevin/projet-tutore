const { exec } = require('child_process');
const util = require('util');
const amqp = require('amqplib');
const createFiles = require("../creation/CreateFiles");
const traitementCode = require("../traitement/TraitementCode");
const createDir = require("../creation/CreateDir");
const Logger = require("../logger");


const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const EXCHANGE_NAME = 'code_exchange';
const PYTHON_QUEUE = 'python_queue';
const RESULT_PYTHON_QUEUE = 'result_python_queue';

Logger.setLanguage('PYTHON');

const execPromise = util.promisify(exec);


async function startWorker(){
    let connection, channel;
    let retries = 5;

    while (!connection && retries > 0) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);
            console.log('Connexion à RabbitMQ réussie');
        } catch (err) {
            console.error('Erreur de connexion à RabbitMQ, nouvelle tentative dans 5 secondes...', err);
            retries--;
            await new Promise(resolve => setTimeout(resolve, 5000)); // Attente de 5 secondes
        }
    }

    if (!connection) {
        console.error('Impossible de se connecter à RabbitMQ après plusieurs tentatives.');
        process.exit(1);
    }

    try {
        channel = await connection.createChannel();
        console.log('Canal RabbitMQ créé avec succès');

        await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
        await channel.assertQueue(PYTHON_QUEUE, { durable: true });
        await channel.assertQueue(RESULT_PYTHON_QUEUE, { durable: true });

        await channel.consume(PYTHON_QUEUE, async (msg) => {
            if (!msg) return;

            const { request_id, codes, testCode, fileTest } = JSON.parse(msg.content.toString());

            let output, error, status;

            try{
                let newDir = await createDir()

                // Créer les fichiers
                const fileCreationCommands = createFiles(newDir, {codes, testCode, fileTest });
                await execPromise(fileCreationCommands);

                output = await traitementCode(newDir,'python')
                error = ''
                status = 200
                Logger.info(`Résultat envoyé pour la requête ${request_id}`);

            }catch (err){
                error = err.message || err
                status = err.status || err.statusText || err.status
                Logger.error(`Erreur lors du traitement du code pour la requête ${request_id} : ${error}`);

            }

            const resultMessage = {request_id, output, error, status };
            try{
                await channel.publish(EXCHANGE_NAME, 'result_python', Buffer.from(JSON.stringify(resultMessage)));

            }catch (err){
                console.error(`Erreur lors de l'envoi du résultat pour la requête ${request_id} : ${err}`);
                Logger.error(`Erreur lors de l'envoi du résultat pour la requête ${request_id} : ${err}`);
            }
            console.log(`Résultat envoyé pour ${request_id}`);
            channel.ack(msg);
        })
    } catch (err) {
        console.error('Erreur lors de la configuration du canal ou du traitement des messages :', err);

        process.exit(1);
    }
    process.on('SIGINT', async () => {
        console.log('Arrêt du worker...');
        if (channel) await channel.close();
        if (connection) await connection.close();
        process.exit(0);
    });
}

startWorker().catch((err) => {
    console.error('Erreur dans le worker :', err);
});

