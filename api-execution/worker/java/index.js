const { exec } = require('child_process');
const util = require('util');
const amqp = require('amqplib');
const createFiles = require("../creation/CreateFiles");
const traitementCode = require("../traitement/TraitementCode");
const createDir = require("../creation/CreateDir");
const Logger = require('../logger');


const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const EXCHANGE_NAME = 'code_exchange';
const JAVA_QUEUE = 'java_queue';
const RESULT_JAVA_QUEUE = 'result_java_queue';
Logger.setLanguage('JAVA');

// Promisifier exec pour l'utiliser avec await
const execPromise = util.promisify(exec);


async function startWorker(){
    let connection, channel;
    let retries = 5;

    // Tentative de connexion à RabbitMQ avec des réessais
    while (!connection && retries > 0) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);
        } catch (err) {
            console.error('Erreur de connexion à RabbitMQ, nouvelle tentative dans 5 secondes...', err);
            retries--;
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }

    if (!connection) {
        console.error('Impossible de se connecter à RabbitMQ après plusieurs tentatives.');
        process.exit(1);
    }

    try {
        channel = await connection.createChannel();

        await channel.assertQueue(JAVA_QUEUE, { durable: true });
        await channel.assertQueue(RESULT_JAVA_QUEUE, { durable: true });


        await channel.consume(JAVA_QUEUE, async (msg) => {
            if (!msg) return;

            const { request_id, codes, testCode, fileTest} = JSON.parse(msg.content.toString());
            let output, error, status;

            try{

                let newDir = await createDir()

                const fileCreationCommands = createFiles(newDir, {codes, testCode, fileTest});
                await execPromise(fileCreationCommands);

                output = await traitementCode(newDir,'java')
                error = ''
                status = 200
                Logger.info(`Résultat envoyé pour la requête ${request_id}`);

            }catch (err){
                error = err.message || err
                status = err.status || err.statusText || err.status
                console.error(error)
                Logger.error(`Erreur lors du traitement du code pour la requête ${request_id} : ${error}`);
            }

            const resultMessage = {request_id, output, error, status };
            await channel.publish(EXCHANGE_NAME, 'result_java', Buffer.from(JSON.stringify(resultMessage)));
            channel.ack(msg);

        })
    } catch (err) {
        Logger.error('Erreur lors de la configuration du canal ou du traitement des messages :', err);

        if (connection) {
            await connection.close();
        }
        process.exit(1);
    }

    process.on('SIGINT', async () => {
        if (channel) await channel.close();
        if (connection) await connection.close();
        process.exit(0);
    });
}

startWorker().catch((err) => {
    console.error('Erreur dans le worker :', err);
});

