// Translator.jsx
import React, { useState } from 'react';

export default function Translator() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('Anglais');
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        if (!text.trim()) return;
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, targetLanguage: language }),
            });
            const data = await response.json();
            setTranslatedText(data.translation);
        } catch (error) {
            setTranslatedText("Erreur de connexion avec le serveur.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Mon Traducteur IA</h2>

            <div style={{ marginBottom: '15px' }}>
                <label>Traduire en : </label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="Anglais">Anglais 🇬🇧</option>
                    <option value="Espagnol">Espagnol 🇪🇸</option>
                    <option value="Allemand">Allemand 🇩🇪</option>
                    <option value="Japonais">Japonais 🇯🇵</option>
                </select>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <textarea
            placeholder="Tapez votre texte ici..."
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '6px' }}
        />

                <button
                    onClick={handleTranslate}
                    disabled={loading}
                    style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                    {loading ? 'Traduction en cours...' : 'Traduire'}
                </button>

                <textarea
                    placeholder="La traduction apparaîtra ici."
                    rows="5"
                    readOnly
                    value={translatedText}
                    style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#f9f9f9' }}
                />
            </div>
        </div>
    );
}