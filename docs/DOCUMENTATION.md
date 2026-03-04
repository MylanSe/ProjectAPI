# 📦 Architecture & Fonctionnalités - API ConfigurateurPC

> Documentation technique complète du projet

## ✅ Fonctionnalités Implémentées

### 1. Gestion des Utilisateurs et Authentification
- ✅ Inscription avec validation des données
- ✅ Connexion avec JWT
- ✅ Hashage sécurisé des mots de passe (bcryptjs)
- ✅ Middleware de protection des routes
- ✅ Gestion des rôles (user/admin)
- ✅ Récupération du profil utilisateur
- ✅ Liste des utilisateurs (admin uniquement)

### 2. Gestion des Catégories
- ✅ CRUD complet (Create, Read, Update, Delete)
- ✅ Génération automatique de slugs
- ✅ Protection admin pour modification/suppression
- ✅ Routes publiques pour consultation

### 3. Gestion des Composants
- ✅ CRUD complet avec validation
- ✅ Association aux catégories
- ✅ Spécifications techniques (Map)
- ✅ Gestion des images
- ✅ Filtrage par catégorie et marque
- ✅ Statut de disponibilité
- ✅ Gestion des prix marchands
- ✅ Ajout/modification/suppression de prix
- ✅ Suivi des stocks par marchand
- ✅ Population automatique des relations

### 4. Gestion des Partenaires Marchands
- ✅ CRUD complet
- ✅ Informations d'affiliation
- ✅ Taux de commission
- ✅ URL et logo
- ✅ Statut actif/inactif
- ✅ Filtrage par statut

### 5. Gestion des Configurations
- ✅ Création de configurations personnalisées
- ✅ Sélection multiple de composants
- ✅ Gestion des quantités
- ✅ Calcul automatique du coût total
- ✅ Association marchand par composant
- ✅ Sauvegarde par utilisateur
- ✅ Multi-configurations par utilisateur
- ✅ Contrôle d'accès (propriétaire ou admin)
- ✅ Export PDF complet avec PDFKit
- ✅ Mise à jour et suppression

### 6. Documentation
- ✅ Documentation Swagger/OpenAPI complète
- ✅ Interface Swagger UI interactive
- ✅ Schémas de données définis
- ✅ Exemples de requêtes/réponses
- ✅ Tags et descriptions
- ✅ Sécurité JWT documentée

### 7. Tests
- ✅ Configuration Jest complète
- ✅ Tests d'authentification
- ✅ Tests CRUD pour toutes les ressources
- ✅ Tests d'autorisation
- ✅ Tests de filtrage
- ✅ Tests d'export PDF
- ✅ Tests de gestion des erreurs
- ✅ Couverture complète des endpoints
- ✅ Configuration pour tests isolés

### 8. Sécurité
- ✅ JWT pour l'authentification
- ✅ Hashage bcrypt des mots de passe
- ✅ Protection CORS
- ✅ Validation des entrées
- ✅ Middleware d'autorisation par rôle
- ✅ Vérification de propriété des ressources
- ✅ Gestion sécurisée des erreurs

### 9. Structure et Organisation
- ✅ Architecture MVC claire
- ✅ Séparation des responsabilités
- ✅ Configuration centralisée
- ✅ Variables d'environnement
- ✅ Gestion des erreurs globale
- ✅ Middleware réutilisables
- ✅ Code modulaire et maintenable

## 📁 Structure du Projet

\`\`\`
ProjetAPI/
├── config/
│   ├── database.js          # Configuration MongoDB
│   └── swagger.js           # Configuration Swagger/OpenAPI
├── controllers/
│   ├── authController.js    # Authentification et utilisateurs
│   ├── categoryController.js # Gestion des catégories
│   ├── componentController.js # Gestion des composants
│   ├── merchantController.js # Gestion des marchands
│   └── configurationController.js # Gestion des configurations
├── middleware/
│   └── auth.js              # Middleware JWT et autorisation
├── models/
│   ├── User.js              # Modèle utilisateur
│   ├── Category.js          # Modèle catégorie
│   ├── Component.js         # Modèle composant
│   ├── Merchant.js          # Modèle marchand
│   └── Configuration.js     # Modèle configuration
├── routes/
│   ├── auth.js              # Routes authentification
│   ├── categories.js        # Routes catégories
│   ├── components.js        # Routes composants
│   ├── merchants.js         # Routes marchands
│   └── configurations.js    # Routes configurations
├── __tests__/
│   └── api.test.js          # Tests complets de l'API
├── .env                     # Variables d'environnement (à ne pas commiter)
├── .env.example             # Template des variables d'environnement
├── .gitignore               # Fichiers à ignorer par Git
├── app.js                   # Point d'entrée de l'application
├── jest.config.js           # Configuration Jest
├── package.json             # Dépendances et scripts
├── seed.js                  # Script de peuplement de la DB
├── README.md                # Documentation principale
├── CONTRIBUTING.md          # Guide de contribution
└── projet API.md            # Cahier des charges original
```

## � Endpoints Disponibles

> **Note** : Pour une documentation détaillée des endpoints, consultez [API_REFERENCE.md](./API_REFERENCE.md)

### Authentification (/api/auth)
- POST /register - Inscription
- POST /login - Connexion
- GET /profile - Profil (authentifié)

### Catégories (/api/categories)
- GET / - Liste
- POST / - Créer (admin)
- GET /:id - Détails
- PUT /:id - Modifier (admin)
- DELETE /:id - Supprimer (admin)

### Composants (/api/components)
- GET / - Liste (avec filtres)
- POST / - Créer (admin)
- GET /:id - Détails
- PUT /:id - Modifier (admin)
- DELETE /:id - Supprimer (admin)

### Marchands (/api/merchants)
- GET / - Liste
- POST / - Créer (admin)
- GET /:id - Détails
- PUT /:id - Modifier (admin)
- DELETE /:id - Supprimer (admin)

### Configurations (/api/configurations)
- GET / - Mes configurations
- POST / - Créer
- GET /:id - Détails
- PUT /:id - Modifier
- DELETE /:id - Supprimer
- GET /:id/export - Export PDF

## 🔐 Authentification

Toutes les routes protégées nécessitent un header Authorization :
```
Authorization: Bearer <token_jwt>
```

## 🧪 Tests

### Couverture des tests :
- ✅ Inscription et connexion
- ✅ Gestion du profil
- ✅ CRUD catégories
- ✅ CRUD composants
- ✅ Gestion des prix marchands
- ✅ CRUD marchands
- ✅ CRUD configurations
- ✅ Export PDF
- ✅ Autorisation et contrôles d'accès
- ✅ Gestion des erreurs

### Lancer les tests :
```bash
npm test                # Tous les tests
npm run test:coverage   # Avec couverture
```

## 📝 Données de test (après npm run seed)

### Compte Admin
- Email: admin@configurateurpc.com
- Password: Admin123!

### Compte Utilisateur
- Email: jean.dupont@email.com
- Password: password123

### Données incluses :
- 8 catégories de composants
- 8 composants (CPU, GPU, RAM, SSD)
- 3 marchands (LDLC, TopAchat, Amazon)
- 1 configuration exemple

## 🛠️ Stack Technique

### Backend
- Node.js v14+
- Express.js 4.x
- MongoDB avec Mongoose

### Sécurité
- JWT (jsonwebtoken)
- bcryptjs pour le hashage

### Documentation
- Swagger UI Express
- swagger-jsdoc

### Tests
- Jest
- Supertest

### Utilitaires
- dotenv (variables d'environnement)
- cors (CORS)
- PDFKit (génération PDF)

## � Ressources Complémentaires

- [QUICKSTART.md](./QUICKSTART.md) - Installation rapide
- [API_REFERENCE.md](./API_REFERENCE.md) - Référence des endpoints
- [DOCKER.md](./DOCKER.md) - Déploiement Docker
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guide de contribution
