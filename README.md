# Mon Traducteur IA

Application web de traduction utilisant React, Node.js, Express et l'API
OpenAI. L'utilisateur saisit un texte, choisit une langue cible, puis obtient
la traduction generee par ChatGPT.

## Fonctionnalites

- Traduction vers l'anglais, l'espagnol, l'allemand, l'italien ou le japonais.
- Interface React avec Vite.
- API backend Express separee du frontend.
- Appel a OpenAI avec le modele `gpt-4o-mini`.
- Indicateur de chargement pendant la traduction.

## Architecture

```text
AppTraduction_IA/
├── ai-frontend/             # Interface React/Vite
│   └── src/
│       └── App.jsx
├── ai-translator/
│   ├── .env                 # Cle API locale, non versionnee
│   ├── package.json         # Dependances backend
│   └── package-lock.json
├── server.js                # API Express sur le port 3001
└── README.md
```

Le frontend envoie les demandes a `http://localhost:3001/api/translate`.
La cle OpenAI reste cote serveur et n'est jamais envoyee au navigateur.

## Prerequis

- Node.js 18 ou une version plus recente
- npm
- Une cle API OpenAI active

## Installation

Depuis la racine du projet, installer les dependances du backend :

```bash
cd ai-translator
npm install
```

Puis installer celles du frontend :

```bash
cd ../ai-frontend
npm install
```

## Configuration de la cle OpenAI

Le fichier `ai-translator/.env` doit contenir :

```env
OPENAI_API_KEY=sk-votre-cle-openai
```

Ne committez jamais ce fichier et ne partagez jamais votre cle API. Si une
cle a ete exposee, revoquez-la dans votre espace OpenAI et generez-en une
nouvelle.

Le serveur charge automatiquement le fichier `.env` situe dans
`ai-translator/`.

## Lancer l'application en developpement

Ouvrir deux terminaux depuis la racine du projet.

### Terminal 1 : backend

```bash
cd ai-translator
npm start
```

Le serveur est disponible sur `http://localhost:3001`.

### Terminal 2 : frontend

```bash
cd ai-frontend
npm run dev
```

Vite affiche ensuite l'URL locale, generalement
`http://localhost:5173`.

## Utilisation

1. Ouvrir l'URL fournie par Vite.
2. Saisir ou coller un texte dans le premier champ.
3. Choisir la langue cible.
4. Cliquer sur **Traduire**.
5. Lire le resultat dans le champ de sortie.

## API

### `POST /api/translate`

Requete :

```json
{
  "text": "Bonjour le monde",
  "targetLanguage": "Anglais"
}
```

Reponse :

```json
{
  "translation": "Hello world"
}
```

L'API renvoie `400` si `text` ou `targetLanguage` est manquant, et `500` si
l'appel OpenAI echoue.

## Verification et build

Construire le frontend pour la production :

```bash
cd ai-frontend
npm run build
```

Verifier le code avec ESLint :

```bash
npm run lint
```

Un test fonctionnel de l'API peut etre realise avec PowerShell :

```powershell
$body = @{
  text = "Bonjour le monde"
  targetLanguage = "Anglais"
} | ConvertTo-Json

Invoke-RestMethod `
  -Uri "http://localhost:3001/api/translate" `
  -Method Post `
  -ContentType "application/json" `
  -Body $body
```

## Depannage

### Le frontend ne traduit pas

- Verifier que le backend est lance sur le port `3001`.
- Verifier que `ai-translator/.env` contient une cle valide.
- Regarder les erreurs affichees dans le terminal du backend.
- Verifier qu'aucun autre programme n'utilise le port `3001`.

### Le port du frontend change

Si le port `5173` est deja utilise, Vite choisit automatiquement un autre
port. Utiliser l'URL affichee dans le terminal.

### Erreur de dependance native Vite/Rolldown

Reinstaller les dependances du frontend :

```bash
cd ai-frontend
Remove-Item node_modules -Recurse -Force
npm install --include=optional
```

