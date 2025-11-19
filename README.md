# Kolizeo Test

Application Next.js pour afficher des liens dynamiques par club récupéré sur l'API Client Unity Remote Config avec une authentification de player anonyme.

# ✨ Expérience

- Difficultés : Pas de difficulté particulière, si ce n'est de lire la documentation Unity 😆
- Réflexions : J'ai pris le temps de faire une architecture propre et toute équipée pour un projet petit/moyen. Cela n'a pas de grand intérêt pour ce petit test mais ça m'a permis d'améliorer l'architecture de base que je fais pour des projets Next.js.
  Aussi, j'ai pris la liberté de modifier certaines consignes pour avoir un site un peu plus sympa !
- Temps estimé : ~1.5h
- Temps passé : 4h, je me suis amusé à tester plusieurs design, lire un peu plus en profondeur les documentations API Unity, faire de la veille sur des packages/librairies (tanstack, aceternity, etc.) pour voir si j'allais les implémenter ou non.

## 🏗️ Architecture du projet

### Arborescence

```
kolizeo-test/
├── app/                         # Next.js App Router
│   ├── [club]/                  # Route dynamique pour les clubs
│   │   ├── components/
│   │   │   └── LinkCard.tsx     # Composant pour afficher les liens d'un club
│   │   ├── loading.tsx          # État de chargement
│   │   ├── not-found.tsx        # Page 404
│   │   └── page.tsx             # Page détail du club
│   ├── api/                     # Routes API
│   │   └── clubs/
│   │       └── route.ts         # Endpoint pour récupérer tous les clubs
│   ├── layout.tsx               # Layout
│   └── page.tsx                 # Page listing des clubs
├── components/                  # Composants React réutilisables
│   ├── ui/                      # Composants Shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── text-hover-effect.tsx
│   ├── ButtonShiny.tsx          # Bouton personnalisé
│   ├── ClubCard.tsx             # Carte club
│   └── Navbar.tsx               # Navbar
├── lib/                         # Logique métier et utilitaires
│   ├── unity/                   # Intégration Unity Remote Config
│   │   ├── client.ts            # Client Unity avec authentification anonyme
│   │   ├── fetch-clubs.ts       # Récupération de tous les clubs
│   │   ├── map-club-to-key.ts   # Mapping club → clé Remote Config
│   │   ├── token-manager.ts     # Gestion des tokens Unity (cookies)
│   │   └── types.ts             # Types TypeScript pour Unity
│   └── utils/
│       ├── logger.ts            # Utilitaire de logging
│       └── utils.ts             # Utilitaires (cn pour Shadcn)
├── middleware.ts                # Middleware Next.js pour authentification Unity et stockage du token
├── public/                      # Assets statiques
│   ├── favicon.ico
│   └── logo.webp
├── styles/
│   └── globals.css              # Styles globaux Tailwind + variables CSS
├── .env                         # Variables d'environnement
├── components.json              # Configuration Shadcn/ui
├── next.config.js               # Configuration Next.js
├── package.json                 # Dépendances et scripts
├── postcss.config.js            # Configuration PostCSS
├── tailwind.config.ts           # Configuration Tailwind CSS
└── tsconfig.json                # Configuration TypeScript
```

## 🛠️ Technologies

### Framework & Runtime

- **Next.js** :
  - Server Components par défaut
  - Routes API intégrées
  - Middleware pour authentification

- **TypeScript** : Typage statique

### Styling

- **Tailwind CSS** : Framework CSS
- **Shadcn/ui** :
  - Button
  - Card
  - Text Hover Effect
- **Framer Motion** : Animations React

### Gestion des dépendances

- **pnpm** : Gestionnaire de paquets rapide et efficace

### Validation & Qualité

- **Zod** : Validation de schémas TypeScript
- **ESLint** : Linter JavaScript/TypeScript
- **Prettier** : Formateur de code

### Intégrations externes

- **Unity Remote Config API** :
  - Authentification anonyme
  - Récupération de configurations des clubs

### Outils de développement

- **PostCSS** : Traitement CSS
- **Autoprefixer** : Préfixes CSS automatiques

## 🚀 Installation

```bash
# Installer les dépendances
pnpm install
```

## ⚙️ Configuration

Variables d'environnement requises (`.env`) :

```env
UNITY_PROJECT_ID=your_project_id
UNITY_COOKIE_NAME=kolizeo_unity_token
NODE_ENV=development
```

## 📜 Scripts

```bash
# Développement
pnpm dev

# Build de production
pnpm build

# Démarrer en production
pnpm start

# Linter
pnpm lint
```

## 🎨 Fonctionnalités

- ✅ Authentification automatique avec Unity API
- ✅ Gestion du token d'authentification via cookies
- ✅ Affichage dynamique de la liste des clubs
- ✅ Pages dynamiques par club
