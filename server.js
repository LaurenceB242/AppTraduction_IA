const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, 'ai-translator', '.env');

require('dotenv').config({ path: envPath });

// Support the current .env format while the token is moved onto the key line.
if (!process.env.OPENAI_API_KEY) {
    const token = fs.readFileSync(envPath, 'utf8')
        .split(/\r?\n/)
        .map((line) => line.trim())
        .find((line) => line.startsWith('sk-'));

    if (token) {
        process.env.OPENAI_API_KEY = token;
    }
}

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

// Initialisation d'OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
        return res.status(400).json({ error: "Données manquantes." });
    }

    try {
        // Appel à l'API ChatGPT
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // Modèle ultra-rapide et économique
            messages: [
                {
                    role: 'system',
                    content: `Tu es un traducteur professionnel. Traduis le texte fourni en ${targetLanguage}. Ne ajoute aucun commentaire, salutation ou explication. Renvoie UNIQUEMENT la traduction brute.`
                },
                {
                    role: 'user',
                    content: text
                }
            ],
            temperature: 0.3, // Basse température pour une traduction plus fidèle et moins "créative"
        });

        res.json({ translation: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la traduction avec ChatGPT." });
    }
});

app.listen(3001, () => console.log('Serveur actif sur le port 3001'));
