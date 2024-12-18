const amqp = require('amqplib');
const { execDocker } = require('./executor');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const CODE_QUEUE = 'code_queue';
const RESULT_QUEUE = 'result_queue';

// Fonction principale pour traiter les messages
async function startWorker() {
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

    // Création d'un canal RabbitMQ
    try {
        channel = await connection.createChannel();
        console.log('Canal RabbitMQ créé avec succès');

        // Assurer que les files existent
        await channel.assertQueue(CODE_QUEUE, { durable: true });
        await channel.assertQueue(RESULT_QUEUE, { durable: true });

        console.log(`Worker en attente de messages sur "${CODE_QUEUE}"...`);

        // Consommation des messages dans la file "code_queue"
        await channel.consume(CODE_QUEUE, async (msg) => {
            if (!msg) return; // En cas de message invalide

            const { request_id, language, codes, testCode } = JSON.parse(msg.content.toString());
            console.log(`Message reçu : ${request_id}, Langage : ${language}`);

            let output, error, status;

            try {
                // Choix de l'image Docker en fonction du langage
                const dockerImage = getDockerImage(language);
                console.log(`Exécution du code avec l'image : ${dockerImage}`);

                // Exécution du code dans Docker
                output = await execDocker(dockerImage, language, { codes, testCode });
                status = 'success';
            } catch (err) {
                error = err.message || err;
                status = 'error';
            }

            // Publier le résultat dans la file "result_queue"
            const resultMessage = { request_id, output, error, status };
            await channel.sendToQueue(RESULT_QUEUE, Buffer.from(JSON.stringify(resultMessage)), { persistent: true });
            console.log(`Résultat envoyé pour ${request_id}`);

            // Accusation de réception du message
            channel.ack(msg);
        });
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

// Fonction pour mapper les langages aux images Docker
function getDockerImage(language) {
    switch (language) {
        case 'java':
            return 'java_exec'; // Image pour Java
        case 'python':
            return 'python_exec'; // Image pour Python
        case 'javascript':
            return 'node:18'; // Image pour Node.js
        default:
            throw new Error(`Langage non supporté : ${language}`);
    }
}

// Démarrer le worker
startWorker().catch((err) => {
    console.error('Erreur dans le worker :', err);
});
