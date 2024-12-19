const express = require('express');
const axios = require('axios'); // Pour envoyer des requêtes HTTP
const { v4: uuidv4 } = require('uuid'); // Pour générer des request_id

const app = express();
const PORT = 3000;

// URL du micro-service responsable de la validation du code
const LANGUAGE_SERVICE_URLS = {
    java: process.env.JAVA_SERVICE_URL || 'http://java:4000',
    python: process.env.PYTHON_SERVICE_URL || 'http://python:4001',
    // Ajouter d'autres langages ici...
};

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Gestion des requêtes dynamiques pour les langages (e.g., /java/validate)
app.post('/:language/validate', async (req, res) => {
    const { language } = req.params;
    const { codes, testCode } = req.body;

    if (!codes && !testCode) {
        return res.status(400).json({ error: 'Code source ou test manquant dans le body.' });
    }

    const serviceUrl = LANGUAGE_SERVICE_URLS[language];
    if (!serviceUrl) {
        return res.status(400).json({ error: `Aucun service configuré pour le langage "${language}".` });
    }

    const requestId = uuidv4(); // Génération d'un identifiant unique pour la requête
    console.log(`Requête reçue pour langage: ${language}, request_id: ${requestId}`);

    try {
        // Préparer le payload pour le micro-service
        const payload = {
            request_id: requestId,
            codes,
            testCode,
        };

        // Envoyer la requête au micro-service
        const response = await axios.post(`${serviceUrl}/validate`, payload);

        console.log(`Réponse reçue pour ${requestId} :`, response.data);

        // Retourner le résultat au client
        res.status(200).json({
            request_id: requestId,
            ...response.data,
        });
    } catch (error) {
        console.error('Erreur dans le traitement de la requête :', error.message);

        // Gérer les erreurs venant du micro-service ou d'axios
        if (error.response) {
            // Erreur côté micro-service
            return res.status(error.response.status).json(error.response.data);
        }
        console.error(error)

        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`API Backend démarrée sur http://localhost:${PORT}`);
});
