const { exec } = require('child_process');
const util = require('util');
const amqp = require('amqplib');
const createFiles = require("./creation/CreateFiles");
const traitementCode = require("./traitement/TraitementCode");
const createDir = require("./creation/CreateDir");


const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const JAVA_QUEUE = 'java_queue';
const RESULT_JAVA_QUEUE = 'result_java_queue';


// Promisifier exec pour l'utiliser avec await
const execPromise = util.promisify(exec);


async function startWorker(){
    let connection, channel;
    let retries = 5; // Nombre maximum de tentatives pour la connexion

    // Tentative de connexion à RabbitMQ avec des réessais
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

    // Si toutes les tentatives échouent
    if (!connection) {
        console.error('Impossible de se connecter à RabbitMQ après plusieurs tentatives.');
        process.exit(1); // Quitte le processus avec une erreur
    }

    try {
        channel = await connection.createChannel();
        console.log('Canal RabbitMQ créé avec succès');

        // Assurer que les files existent
        await channel.assertQueue(JAVA_QUEUE, { durable: true });
        await channel.assertQueue(RESULT_JAVA_QUEUE, { durable: true });

        await channel.consume(JAVA_QUEUE, async (msg) => {
            if (!msg) return; // En cas de message invalide

            const { request_id, codes, testCode } = JSON.parse(msg.content.toString());

            let output, error, status;

            try{
                // Créer un répertoire temporaire
                let newDir = await createDir()

                // Créer les fichiers
                const fileCreationCommands = createFiles(newDir, {codes, testCode});  // Passer newDir et req.body à createFiles
                await execPromise(fileCreationCommands);  // Utilisation de execPromise ici
                console.log('Fichiers créés avec succès');

                // Envoi du résultat au micro-service de validation
                output = await traitementCode(newDir)
                error = ''
                status = 200

            }catch (err){
                error = err.message || err
                status = err.status || err.statusText || err.status
            }

            const resultMessage = {request_id, output, error, status };
            await channel.sendToQueue(RESULT_JAVA_QUEUE, Buffer.from(JSON.stringify(resultMessage)), { persistent: true });
            console.log(`Résultat envoyé pour ${request_id}`);
            // Accusation de réception du message
            channel.ack(msg);
        })
    } catch (err) {
        console.error('Erreur lors de la configuration du canal ou du traitement des messages :', err);

        // Fermeture propre de la connexion en cas d'erreur critique
        if (connection) {
            await connection.close();
        }
        process.exit(1); // Quitte le processus avec une erreur
    }
    // Gestion de la fermeture du processus (SIGINT / SIGTERM)
    process.on('SIGINT', async () => {
        console.log('Arrêt du worker...');
        if (channel) await channel.close();
        if (connection) await connection.close();
        process.exit(0);
    });
}

// Démarrer le worker
startWorker().catch((err) => {
    console.error('Erreur dans le worker :', err);
});

