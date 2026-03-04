# 🖥️ API ConfigurateurPC

API RESTful pour la configuration de PC sur mesure développée avec Node.js, Express et MongoDB.

[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5.0-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)


### Front-end

Interface Vue.js disponible dans le dossier `front/`.

### Prérequis
- Node.js v20+

### Démarrage
```bash
cd front
npm install
npm run dev
```

L'interface sera accessible sur **http://localhost:5173**

## 📋 Description

Cette API permet de créer des configurations PC personnalisées en sélectionnant des composants matériels, comparant les prix de différents marchands et exportant les configurations au format PDF.

### Fonctionnalités principales

- 🔐 **Authentification** : Inscription/Connexion avec JWT, gestion des rôles (user/admin)
- 📦 **Composants** : CRUD complet, filtrage par catégorie/marque, spécifications techniques
- 🏪 **Marchands** : Gestion des partenaires, prix, stocks et commissions
- ⚙️ **Configurations** : Création, sauvegarde, calcul automatique des coûts, export PDF
- 📚 **Documentation** : Swagger UI interactive
- ✅ **Tests** : Couverture complète avec Jest

## 🚀 Démarrage Rapide

### Option 1 : Avec Docker (Recommandé)

```bash
# Démarrer les services
docker-compose up -d

# Peupler la base de données
docker-compose exec app npm run seed

# Accéder à l'API
# http://localhost:3000
# http://localhost:3000/api-docs (Documentation)
```

📖 [Guide complet Docker](./docs/DOCKER.md)

### Option 2 : Installation Manuelle

**Prérequis** : Node.js (v14+) et MongoDB

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# 3. Démarrer MongoDB (si local)
# Windows : le service démarre automatiquement
# Linux : sudo systemctl start mongodb
# Mac : brew services start mongodb-community

# 4. Peupler la base de données
npm run seed

# 5. Démarrer l'API
npm run dev
```

📖 [Guide d'installation détaillé](./docs/QUICKSTART.md)

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART.md](./docs/QUICKSTART.md) | Installation pas à pas (5 min) |
| [DOCKER.md](./docs/DOCKER.md) | Utilisation avec Docker |
| [API_REFERENCE.md](./docs/API_REFERENCE.md) | Référence complète des endpoints |
| [CONTRIBUTING.md](./docs/CONTRIBUTING.md) | Guide de contribution |

### Documentation interactive

Une fois l'API démarrée, accédez à la documentation Swagger :
- **URL** : http://localhost:3000/api-docs
- Interface interactive pour tester tous les endpoints

## 🛠️ Technologies

- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB, Mongoose
- **Authentification** : JWT, bcryptjs
- **Documentation** : Swagger UI, swagger-jsdoc
- **Export** : PDFKit
- **Tests** : Jest, Supertest

## 📁 Structure du Projet

```
ProjectAPI/
├── config/          # Configuration (DB, Swagger)
├── controllers/     # Logique métier
├── middleware/      # Auth, validation
├── models/          # Modèles Mongoose
├── routes/          # Définition des routes
├── __tests__/       # Tests Jest
├── docs/            # Documentation
├── app.js           # Point d'entrée
└── seed.js          # Script de peuplement
```

## 🔑 Endpoints Principaux

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur

### Composants
- `GET /api/components` - Lister les composants
- `GET /api/components/:id` - Détail d'un composant
- `POST /api/components` - Créer (admin)
- `PUT /api/components/:id` - Modifier (admin)
- `DELETE /api/components/:id` - Supprimer (admin)

### Configurations
- `GET /api/configurations` - Mes configurations
- `POST /api/configurations` - Créer une configuration
- `GET /api/configurations/:id/export` - Export PDF

📖 [Documentation API complète](./docs/API_REFERENCE.md)

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Tests avec couverture
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 🔐 Comptes de Test

Après `npm run seed` :

**Administrateur**
- Email : `admin@configurateurpc.com`
- Mot de passe : `Admin123!`

**Utilisateur**
- Email : `jean.dupont@email.com`
- Mot de passe : `password123`

## 🌍 Variables d'Environnement

```env
# Application
PORT=3000
NODE_ENV=development

# Base de données
MONGO_URI=mongodb://localhost:27017/configurateur_pc

# JWT
JWT_SECRET=votre_secret_securise
JWT_EXPIRE=7d

# Admin par défaut
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
```

⚠️ **Important** : En production, générez un JWT_SECRET sécurisé :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez le [guide de contribution](./docs/CONTRIBUTING.md).

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/ma-feature`)
3. Committez (`git commit -m 'feat: ajout de ma feature'`)
4. Push (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

## 📝 Scripts NPM

```bash
npm run dev          # Démarrer en mode développement
npm start            # Démarrer en production
npm test             # Exécuter les tests
npm run seed         # Peupler la base de données
npm run test:watch   # Tests en mode watch
```

## 📄 Licence

MIT © ConfigurateurPC.com

## 📞 Support

- 📧 Email : support@configurateurpc.com
- 📚 Documentation : http://localhost:3000/api-docs
- 🐛 Issues : [GitHub Issues](https://github.com/MylanSe/ProjectAPI/issues)

---

**Fait avec ❤️ par l'équipe ConfigurateurPC**
