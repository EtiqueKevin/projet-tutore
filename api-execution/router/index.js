const express = require('express');
const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;


const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://user:password@rabbitmq';
const EXCHANGE_NAME = 'code_exchange';
const JAVA_QUEUE = 'java_queue';
const RESULT_JAVA_QUEUE = 'result_java_queue';
const PYTHON_QUEUE = 'python_queue';
const RESULT_PYTHON_QUEUE = 'result_python_queue';

app.use(express.json());
let connection;
let channel;

async function connectToRabbitMQ() {


    while (!connection || !channel) {
        try {
            connection = await amqp.connect(RABBITMQ_URL);
            channel = await connection.createChannel();
            await channel.assertExchange(EXCHANGE_NAME, 'direct', { durable: true });
            await channel.assertQueue(JAVA_QUEUE, { durable: true });
            await channel.assertQueue(RESULT_JAVA_QUEUE, { durable: true });
            await channel.assertQueue(PYTHON_QUEUE, { durable: true });
            await channel.assertQueue(RESULT_PYTHON_QUEUE, { durable: true });
            await channel.bindQueue(JAVA_QUEUE, EXCHANGE_NAME, 'java');
            await channel.bindQueue(RESULT_JAVA_QUEUE, EXCHANGE_NAME, 'result_java');
            await channel.bindQueue(PYTHON_QUEUE, EXCHANGE_NAME, 'python');
            await channel.bindQueue(RESULT_PYTHON_QUEUE, EXCHANGE_NAME, 'result_python');
            console.log('Connexion à RabbitMQ réussie');
        } catch (error) {
            console.error('Erreur de connexion à RabbitMQ, tentative dans 5 secondes...', error);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }

    return { connection, channel };
}


app.post('/:language', async (req, res) => {
    const { language } = req.params;
    const { codes, testCode, fileTest } = req.body;

    if (!codes && !testCode) {
        return res.status(400).json({ error: 'Code source ou test manquant dans le body.' });
    }

    const requestId = uuidv4();
    console.log(`Requête reçue pour langage: ${language}, request_id: ${requestId}`);

    try {


        const message = {
            request_id: requestId,
            codes,
            testCode,
            fileTest
        };

        let routingKey;
        let result_routingKey;
        switch (language) {
            case 'java':
                routingKey = 'java';
                result_routingKey = 'result_java';
                break;
            case 'python':
                routingKey = 'python';
                result_routingKey = 'result_python';
                break;
            default:
                return res.status(400).json({ error: 'Langage non supporté.' });
        }

        await channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));

        channel.consume(
            result_routingKey,
            (msg) => {
                const result = JSON.parse(msg.content.toString());

                if (result.request_id === requestId) {

                    // Retourner le résultat au client
                    res.status(200).json({
                        request_id: requestId,
                        output: result.output,
                        error: result.error,
                        status: result.status,
                    });

                    channel.ack(msg);
                    channel.close();
                }
            },
            { noAck: false }
        );
    } catch (error) {
        console.error('Erreur dans le traitement de la requête :', error.message);

        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        }
        console.error(error)

        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Démarrer le serveur
app.listen(PORT, async () => {
    console.log(`API Backend démarrée sur http://localhost:${PORT}`);
    try {
        const rabbitMQConnection = await connectToRabbitMQ();
        connection = rabbitMQConnection.connection;
        channel = rabbitMQConnection.channel;
    } catch (error) {
        console.error('Erreur lors de la connexion à RabbitMQ lors du démarrage du serveur :', error.message);
        process.exit(1);
    }
});
