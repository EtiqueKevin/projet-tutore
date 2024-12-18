const amqp = require('amqplib');
const { execDocker } = require('./executor');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const CODE_QUEUE = 'code_queue';
const RESULT_QUEUE = 'result_queue';

// Fonction principale pour traiter les messages
async function startWorker() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertQueue(CODE_QUEUE, { durable: true });
        await channel.assertQueue(RESULT_QUEUE, { durable: true });

        console.log(`Worker en attente de messages sur "${CODE_QUEUE}"...`);

        await channel.consume(CODE_QUEUE, async (msg) => {
            const { request_id, language, codes, testCode } = JSON.parse(msg.content.toString());
            console.log(`Message reçu : ${request_id}, Langage : ${language}`);

            let output, error, status;

            try {
                // Choix de l'image Docker en fonction du langage
                const dockerImage = getDockerImage(language);
                console.log(`Exécution du code avec l'image : ${dockerImage}`);

                // Exécution du code dans Docker
                output = await execDocker(dockerImage, language,{ codes, testCode });
                status = 'success';
            } catch (err) {
                error = err.message || err;
                status = 'error';
            }

            // Publier le résultat dans la file "result_queue"
            const resultMessage = { request_id, output, error, status };
            channel.sendToQueue(RESULT_QUEUE, Buffer.from(JSON.stringify(resultMessage)), { persistent: true });
            console.log(`Résultat envoyé pour ${request_id}`);

            // Accusation de réception
            channel.ack(msg);
        });
    } catch (error) {
        console.error('Erreur lors de la connexion à RabbitMQ ou du traitement des messages :', error);
        // Ajoute une logique pour reconnecter ou gérer l'erreur globalement
    }
}

// Fonction pour mapper les langages aux images Docker
function getDockerImage(language) {
    switch (language) {
        case 'java':
            return 'java_exec';  // Image pour Java
        case 'python':
            return 'python_exec'; // Image pour Python
        case 'javascript':
            return 'node:18';  // Image pour Node.js
        default:
            throw new Error(`Langage non supporté : ${language}`);
    }
}

// Démarrer le worker
startWorker().catch((err) => {
    console.error('Erreur dans le worker :', err);
});
