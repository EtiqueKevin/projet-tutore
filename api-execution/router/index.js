const express = require('express');
const { createClient } = require('redis');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");

const app = express();
const PORT = 3000;

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({ url: REDIS_URL });

const JAVA_STREAM = 'java_stream';
const RESULT_JAVA_STREAM = 'result_java_stream';
const PYTHON_STREAM = 'python_stream';
const RESULT_PYTHON_STREAM = 'result_python_stream';

app.use(express.json());

// Connexion à Redis
async function connectToRedis() {
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    await redisClient.connect();
    console.log('✅ Connexion à Redis réussie');
}

app.post('/:language', async (req, res) => {
    const { language } = req.params;
    const { id_lesson, index, codes } = req.body;
    let testCode = '';
    let fileTest = '';
    await axios.get(`http://api.cours.jeancademie:8888/lessons/${id_lesson}/exercise/${index}`).then(
        response => {
            const { data } = response;
            data.exercise.files.forEach(file => {
                if (file.type === 'test') {
                    testCode = file.content
                    fileTest = file.filename;
                }
            })
            console.log(testCode, fileTest);
        }
    )

    if (!codes || !testCode) {
        return res.status(400).json({ error: 'Code source ou test manquant' });
    }

    console.log(`📝 Requête reçue pour langage: ${language}`);

    let streamName, resultStream;
    switch (language) {
        case 'java':
            streamName = JAVA_STREAM;
            resultStream = RESULT_JAVA_STREAM;
            break;
        case 'python':
            streamName = PYTHON_STREAM;
            resultStream = RESULT_PYTHON_STREAM;
            break;
        default:
            return res.status(400).json({ error: 'Langage non supporté.' });
    }

    const message = {
        codes,
        testCode,
        fileTest
    };

    try {
        console.log(`Stream: ${streamName}`)
        await redisClient.xAdd(streamName, '*', { data: JSON.stringify(message) });
        console.log(`📤 Message publié dans ${streamName}`);

        // Attendre la réponse du worker
        const startTime = Date.now();
        while (Date.now() - startTime < 10000) {
            const result = await redisClient.xRead(
                [{ key: resultStream, id: '0' }],
                { COUNT: 1 }
            );

            if (result) {
                const responseData = JSON.parse(result[0].messages[0].message.message);
                await redisClient.xDel(resultStream, result[0].messages[0].id);
                console.log(`✅ Résultat reçu`);
                return res.status(200).json(responseData);
            }
        }

        return res.status(408).json({ error: 'Timeout en attente du résultat' });

    } catch (error) {
        console.error('❌ Erreur lors du traitement :', error.message);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Démarrer le serveur
app.listen(PORT, async () => {
    console.log(`🚀 API démarrée sur http://localhost:${PORT}`);
    try {
        await connectToRedis();
    } catch (error) {
        console.error('❌ Erreur lors de la connexion à Redis :', error.message);
        process.exit(1);
    }
});
