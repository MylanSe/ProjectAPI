# API ConfigurateurPC.com

API RESTful pour la configuration de PC sur mesure développée avec Node.js, Express et MongoDB.

## 📋 Description

Cette API permet aux utilisateurs de créer des configurations PC personnalisées en sélectionnant des composants matériels, en comparant les prix de différents marchands et en exportant leurs configurations au format PDF.

## 🚀 Fonctionnalités

### Gestion des Utilisateurs
- ✅ Inscription et connexion avec JWT
- ✅ Rôles utilisateur (user/admin)
- ✅ Gestion du profil utilisateur

### Gestion des Catégories et Composants
- ✅ CRUD complet des catégories (CPU, GPU, RAM, etc.)
- ✅ CRUD complet des composants matériels
- ✅ Filtrage par catégorie et marque
- ✅ Spécifications techniques détaillées

### Gestion des Partenaires Marchands
- ✅ CRUD des partenaires marchands
- ✅ Gestion des prix par marchand
- ✅ Suivi des stocks et disponibilité
- ✅ Programme d'affiliation

### Gestion des Configurations
- ✅ Création et sauvegarde de configurations
- ✅ Calcul automatique du coût total
- ✅ Export PDF des configurations
- ✅ Gestion multi-configurations par utilisateur

### Sécurité
- ✅ Authentification JWT
- ✅ Protection des routes admin
- ✅ Hashage bcrypt des mots de passe
- ✅ Validation des données

### Documentation et Tests
- ✅ Documentation Swagger/OpenAPI
- ✅ Tests unitaires avec Jest et Supertest
- ✅ Couverture de tous les endpoints

## 🛠️ Technologies

- **Backend**: Node.js, Express.js
- **Base de données**: MongoDB avec Mongoose
- **Authentification**: JWT (JSON Web Tokens)
- **Sécurité**: bcryptjs
- **Documentation**: Swagger UI, swagger-jsdoc
- **Export PDF**: PDFKit
- **Tests**: Jest, Supertest
- **Autres**: dotenv, cors, express-validator

## 📦 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- MongoDB (local ou Atlas)
- npm ou yarn

### Étapes d'installation

1. **Cloner le repository**
\`\`\`bash
git clone <url-du-repo>
cd ProjetAPI
\`\`\`

2. **Installer les dépendances**
\`\`\`bash
npm install
\`\`\`

3. **Configurer les variables d'environnement**

Copier le fichier d'exemple et le modifier :

\`\`\`bash
cp .env.example .env
\`\`\`

Ou créer un fichier \`.env\` à la racine du projet avec ces variables :

\`\`\`env
# Configuration de l'application
PORT=3000
NODE_ENV=development

# Configuration MongoDB
# Local: mongodb://localhost:27017/configurateur_pc
# Atlas: mongodb+srv://username:password@cluster.mongodb.net/configurateur_pc
MONGODB_URI=mongodb://localhost:27017/configurateur_pc

# Configuration JWT
# Générer une clé secrète forte (ex: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET=votre_secret_jwt_super_securise_a_changer_en_production
JWT_EXPIRE=7d

# Compte administrateur par défaut (à modifier en production)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=ChangeMe123!
\`\`\`

⚠️ **Important** : En production, générez un JWT_SECRET sécurisé :
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

4. **Démarrer MongoDB**
\`\`\`bash
# Si MongoDB est installé localement
mongod
\`\`\`

5. **Lancer l'application**

Mode développement :
\`\`\`bash
npm run dev
\`\`\`

Mode production :
\`\`\`bash
npm start
\`\`\`

L'API sera accessible sur \`http://localhost:3000\`

## 📚 Documentation API

Une fois l'application lancée, la documentation Swagger est disponible sur :
\`\`\`
http://localhost:3000/api-docs
\`\`\`

## 🧪 Tests

Lancer tous les tests :
\`\`\`bash
npm test
\`\`\`

Lancer les tests en mode watch :
\`\`\`bash
npm run test:watch
\`\`\`

## 📌 Endpoints Principaux

### Authentification
- \`POST /api/auth/register\` - Inscription
- \`POST /api/auth/login\` - Connexion
- \`GET /api/auth/me\` - Profil utilisateur (authentifié)
- \`GET /api/auth/users\` - Liste des utilisateurs (admin)

### Catégories
- \`GET /api/categories\` - Liste des catégories
- \`POST /api/categories\` - Créer une catégorie (admin)
- \`GET /api/categories/:id\` - Détails d'une catégorie
- \`PUT /api/categories/:id\` - Modifier une catégorie (admin)
- \`DELETE /api/categories/:id\` - Supprimer une catégorie (admin)

### Composants
- \`GET /api/components\` - Liste des composants
- \`POST /api/components\` - Créer un composant (admin)
- \`GET /api/components/:id\` - Détails d'un composant
- \`PUT /api/components/:id\` - Modifier un composant (admin)
- \`DELETE /api/components/:id\` - Supprimer un composant (admin)
- \`POST /api/components/:id/prices\` - Ajouter un prix marchand (admin)
- \`PUT /api/components/:id/prices/:priceId\` - Modifier un prix (admin)
- \`DELETE /api/components/:id/prices/:priceId\` - Supprimer un prix (admin)

### Marchands
- \`GET /api/merchants\` - Liste des marchands
- \`POST /api/merchants\` - Créer un marchand (admin)
- \`GET /api/merchants/:id\` - Détails d'un marchand
- \`PUT /api/merchants/:id\` - Modifier un marchand (admin)
- \`DELETE /api/merchants/:id\` - Supprimer un marchand (admin)

### Configurations
- \`GET /api/configurations\` - Mes configurations (authentifié)
- \`POST /api/configurations\` - Créer une configuration (authentifié)
- \`GET /api/configurations/:id\` - Détails d'une configuration
- \`PUT /api/configurations/:id\` - Modifier une configuration
- \`DELETE /api/configurations/:id\` - Supprimer une configuration
- \`GET /api/configurations/:id/export\` - Exporter en PDF

## 🔐 Authentification

L'API utilise JWT pour l'authentification. Pour accéder aux endpoints protégés :

1. S'inscrire ou se connecter pour obtenir un token
2. Ajouter le token dans le header Authorization :
\`\`\`
Authorization: Bearer <votre_token_jwt>
\`\`\`

## 👥 Rôles

- **user** : Peut créer et gérer ses propres configurations
- **admin** : Accès complet à toutes les ressources (CRUD catégories, composants, marchands)

## 📁 Structure du Projet

\`\`\`
ProjetAPI/
├── config/
│   ├── database.js      # Configuration MongoDB
│   └── swagger.js       # Configuration Swagger
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── componentController.js
│   ├── merchantController.js
│   └── configurationController.js
├── middleware/
│   └── auth.js          # Middleware JWT
├── models/
│   ├── User.js
│   ├── Category.js
│   ├── Component.js
│   ├── Merchant.js
│   └── Configuration.js
├── routes/
│   ├── auth.js
│   ├── categories.js
│   ├── components.js
│   ├── merchants.js
│   └── configurations.js
├── __tests__/
│   └── api.test.js      # Tests unitaires
├── .env                 # Variables d'environnement
├── .gitignore
├── app.js              # Point d'entrée
├── package.json
├── jest.config.js
└── README.md
\`\`\`

## 🔄 Workflow de développement

1. Créer une branche pour chaque fonctionnalité
2. Écrire les tests
3. Implémenter la fonctionnalité
4. Vérifier que tous les tests passent
5. Créer une pull request

## 📝 Exemples d'utilisation

### Inscription
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@email.com",
    "password": "password123"
  }'
\`\`\`

### Connexion
\`\`\`bash
curl -X POST http://localhost:3000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "jean.dupont@email.com",
    "password": "password123"
  }'
\`\`\`

### Créer une configuration
\`\`\`bash
curl -X POST http://localhost:3000/api/configurations \\
  -H "Authorization: Bearer <votre_token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nom": "Gaming PC 2024",
    "description": "Configuration gaming",
    "composants": [
      {
        "composant": "id_du_composant",
        "quantite": 1,
        "prixUnitaire": 450.99
      }
    ]
  }'
\`\`\`

## 🐛 Débogage

Activer les logs détaillés :
\`\`\`bash
NODE_ENV=development npm run dev
\`\`\`

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pusher vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

## 📧 Contact

Pour toute question : support@configurateurpc.com

## 🎯 Roadmap

- [ ] Interface BackOffice React/Angular
- [ ] Vérification de compatibilité des composants
- [ ] Notifications en temps réel
- [ ] Système de recommandations
- [ ] API de synchronisation des prix en temps réel
- [ ] Support multi-langues
- [ ] Optimisation des performances

---

**Développé avec ❤️ pour ConfigurateurPC.com**
