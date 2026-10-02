# Category API

API REST dédiée au catalogue de catégories de ShopInMada. Elle fournit des catégories hiérarchiques (parents et enfants) à l'application web et repose sur **Node.js**, **Express**, **TypeScript** et **MongoDB/Mongoose**.

[![Node.js](https://img.shields.io/badge/Node.js-API-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-333333?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Open source](https://img.shields.io/badge/Open%20source-libre-16834b)](#licence-et-réutilisation)

## Fonctionnement

- Lit et écrit les catégories dans MongoDB.
- Fournit la liste complète, une catégorie et ses enfants, ainsi que des recherches par identifiants.
- Au premier démarrage, initialise la collection vide à partir de `src/data/category_dataset.json`.
- Utilise le préfixe d'API `/api/v1`.

## Prérequis et démarrage

- Node.js et npm.
- Une instance MongoDB accessible.

Depuis le dossier `categoryAPI` :

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Par défaut, l'API démarre sur `http://localhost:3001`.

## Configuration

| Variable      | Description              | Exemple local                                      |
| ------------- | ------------------------ | -------------------------------------------------- |
| `PORT`        | Port HTTP                | `3001`                                             |
| `MONGODB_URI` | URI de connexion MongoDB | `mongodb://localhost:27017/shoppingMadaCategories` |

## Routes

| Méthode | Chemin                       | Description                                |
| ------- | ---------------------------- | ------------------------------------------ |
| `GET`   | `/api/v1/all/category`       | Récupérer le catalogue de catégories       |
| `GET`   | `/api/v1/:parentId/category` | Récupérer une catégorie par son slug       |
| `POST`  | `/api/v1/store/category`     | Créer une catégorie                        |
| `POST`  | `/api/v1/:parentId/add`      | Ajouter une catégorie enfant               |
| `POST`  | `/api/v1/find/category`      | Rechercher des catégories par identifiants |

## Scripts

| Commande        | Description                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Développement avec redémarrage automatique |
| `npm run build` | Compilation TypeScript dans `build/`       |
| `npm start`     | Démarrage du build compilé                 |

## Licence et réutilisation

Ce projet est destiné à être **libre et open source**. Aucun fichier `LICENSE` n'est actuellement présent dans le dépôt ; le README seul ne définit pas les permissions juridiques de copie, modification ou redistribution. Ajoutez une licence explicite avant une publication ou une réutilisation externe afin que ces droits soient clairs.

## Contact

**Avotra Frederic** · FullCoding — Lead Developer

Software Engineering · Full-stack web & mobile · Backend & Software Architecture · Automation & AI

[GitHub](https://github.com/avotra-frederic) · [LinkedIn](https://linkedin.com/in/avotra-frederic) · [fred.avotra@gmail.com](mailto:fred.avotra@gmail.com)
