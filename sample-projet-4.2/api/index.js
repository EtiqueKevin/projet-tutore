const express = require('express');
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid'); // Pour générer des request_id

const app = express();
const PORT = 3000;

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const CODE_QUEUE = 'code_queue';
const RESULT_QUEUE = 'result_queue';

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Fonction pour vérifier la connexion RabbitMQ avec des réessais
async function connectToRabbitMQ() {
    let connection;
    let channel;

    while (!connection || !channel) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);
            channel = await connection.createChannel();
            console.log('Connexion à RabbitMQ réussie');
        } catch (error) {
            console.error('Erreur de connexion à RabbitMQ, tentative dans 5 secondes...', error);
            await new Promise(resolve => setTimeout(resolve, 5000)); // Attente de 5 secondes
        }
    }

    await channel.assertQueue(CODE_QUEUE, { durable: true });
    await channel.assertQueue(RESULT_QUEUE, { durable: true });

    return { connection, channel };
}

// Gestion des requêtes dynamiques pour les langages (e.g., /java/validate)
app.post('/:language/validate', async (req, res) => {
    console.log('Route trouvée')
    const { language } = req.params;
    const { codes, testCode } = req.body;

    if (!codes && !testCode) {
        return res.status(400).json({ error: 'Code source manquant dans le body.' });
    }

    const requestId = uuidv4(); // Génération d'un identifiant unique pour la requête
    console.log(`Requête reçue pour langage: ${language}, request_id: ${requestId}`);

    try {
        // Connexion à RabbitMQ avec réessais
        const { connection, channel } = await connectToRabbitMQ();

        // Publier le message dans la queue "code_queue"
        const message = {
            request_id: requestId,
            language,
            codes,
            testCode,
        };
        await channel.sendToQueue(CODE_QUEUE, Buffer.from(JSON.stringify(message)));
        console.log(`Message publié dans "${CODE_QUEUE}" :`, message);

        // Écouter la réponse dans "result_queue"
        channel.consume(
            RESULT_QUEUE,
            (msg) => {
                const result = JSON.parse(msg.content.toString());

                // Vérifier si la réponse correspond à la requête actuelle
                if (result.request_id === requestId) {
                    console.log(`Résultat reçu pour ${requestId} :`, result);

                    // Retourner le résultat au client
                    res.status(200).json({
                        request_id: requestId,
                        output: result.output,
                        error: result.error,
                        status: result.status,
                    });

                    // Accuser réception et fermer la connexion
                    channel.ack(msg);
                    channel.close();
                    connection.close();
                }
            },
            { noAck: false } // Activer l'acknowledgment manuel
        );
    } catch (error) {
        console.error('Erreur dans le traitement de la requête :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`API Backend démarrée sur http://localhost:${PORT}`);
});
