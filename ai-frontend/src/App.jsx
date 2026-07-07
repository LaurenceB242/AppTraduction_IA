import React, { useState } from 'react';

export default function App() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('Anglais');
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        if (!text.trim()) return;
        setLoading(true);

        try {
            // On envoie la demande à ton serveur Node.js sur le port 3001
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
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', fontFamily: 'Arial, sans-serif', backgroundColor: '#fdfbf7', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#1a365d', textAlign: 'center', marginBottom: '25px' }}>🌐 Mon Traducteur IA (ChatGPT)</h2>

            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Traduire en : </label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                >
                    <option value="Anglais">Anglais 🇬🇧</option>
                    <option value="Espagnol">Espagnol 🇪🇸</option>
                    <option value="Allemand">Allemand 🇩🇪</option>
                    <option value="Italien">Italien 🇮🇹</option>
                    <option value="Japonais">Japonais 🇯🇵</option>
                </select>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
        <textarea
            placeholder="Tapez ou collez votre texte ici..."
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', boxSizing: 'border-box', resize: 'vertical' }}
        />

                <button
                    onClick={handleTranslate}
                    disabled={loading}
                    style={{ padding: '12px', background: loading ? '#94a3b8' : '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.2s' }}
                >
                    {loading ? 'Traduction en cours...' : 'Traduire'}
                </button>

                <textarea
                    placeholder="La traduction générée par ChatGPT apparaîtra ici."
                    rows="5"
                    readOnly
                    value={translatedText}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '15px', backgroundColor: '#f8fafc', boxSizing: 'border-box', resize: 'vertical', color: '#334155' }}
                />
            </div>
        </div>
    );
}