# 🚀 Guide de Démarrage Rapide - API ConfigurateurPC

## ⚡ Installation Express (5 minutes)

### Étape 1 : Installer MongoDB

#### Windows
1. Télécharger MongoDB Community Server : https://www.mongodb.com/try/download/community
2. Lancer l'installateur et suivre les étapes :
   - Type d'installation : **Complete** (recommandé)
   - Service Configuration :
     - ✅ Cocher "Install MongoDB as a Service"
     - Run service as : **Network Service user** (option par défaut - RECOMMANDÉ)
     - Service Name : MongoDB
     - Data Directory : C:\Program Files\MongoDB\Server\7.0\data\
     - Log Directory : C:\Program Files\MongoDB\Server\7.0\log\
   - ✅ Cocher "Install MongoDB Compass" (interface graphique optionnelle mais utile)
3. MongoDB démarre automatiquement en arrière-plan comme service Windows

**Note** : Pour le développement local, utilisez **"Network Service user"**. L'option "Local or Domain User" est plus adaptée pour les environnements de production avec des besoins de sécurité spécifiques.

#### macOS
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

#### Linux
\`\`\`bash
sudo apt-get install mongodb
sudo systemctl start mongodb
\`\`\`

### Étape 2 : Vérifier MongoDB

#### Option 1 : Via le service Windows (RECOMMANDÉ pour Windows)
\`\`\`powershell
# Vérifier que le service MongoDB est démarré
Get-Service MongoDB
# Status doit être "Running"

# Si le service est arrêté, le démarrer :
Start-Service MongoDB
\`\`\`

#### Option 2 : Via MongoDB Compass (Interface graphique)
Si vous avez installé MongoDB Compass :
1. Ouvrir MongoDB Compass depuis le menu Démarrer
2. Se connecter à \`mongodb://localhost:27017\`
3. Si la connexion réussit, MongoDB fonctionne ✅

#### Option 3 : Via mongosh (Shell)
\`\`\`powershell
# Si mongosh n'est pas reconnu, utiliser le chemin complet :
& "C:\Program Files\MongoDB\Server\7.0\bin\mongosh.exe"

# OU fermer et rouvrir VS Code pour recharger le PATH
\`\`\`

**Note** : Si le service Windows "MongoDB" est démarré (Option 1), vous pouvez passer directement à l'étape 3. L'API se connectera automatiquement.

### Étape 3 : Configuration du projet
\`\`\`bash
# Copier le fichier d'environnement
copy .env.example .env

# Ou sur Linux/Mac
cp .env.example .env
\`\`\`

Le fichier .env est déjà configuré pour une installation locale par défaut.

### Étape 4 : Peupler la base de données
\`\`\`bash
npm run seed
\`\`\`

Vous devriez voir :
\`\`\`
✅ Base de données peuplée avec succès !
📊 Résumé :
   - 2 utilisateurs
   - 8 catégories
   - 8 composants
   - 3 marchands
   - 1 configurations
\`\`\`

### Étape 5 : Démarrer l'API
\`\`\`bash
npm run dev
\`\`\`

Vous devriez voir :
\`\`\`
MongoDB connecté: localhost
Serveur démarré sur le port 3000
Documentation disponible sur http://localhost:3000/api-docs
\`\`\`

### Étape 6 : Tester l'API

#### Option 1 : Via le navigateur
Ouvrir : http://localhost:3000/api-docs

#### Option 2 : Via cURL
\`\`\`bash
# Test de connexion
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@configurateurpc.com\",\"password\":\"Admin123!\"}"
\`\`\`

#### Option 3 : Via Postman/Insomnia
1. Importer la documentation depuis : http://localhost:3000/api-docs
2. Tester les endpoints

### Étape 7 : Exécuter les tests
\`\`\`bash
npm test
\`\`\`

## 🎯 Premiers Pas

### 1. Se connecter en tant qu'admin
\`\`\`bash
POST http://localhost:3000/api/auth/login
{
  "email": "admin@configurateurpc.com",
  "password": "Admin123!"
}
\`\`\`

Copier le token reçu.

### 2. Lister les composants
\`\`\`bash
GET http://localhost:3000/api/components
\`\`\`

### 3. Créer une configuration
\`\`\`bash
POST http://localhost:3000/api/configurations
Headers: Authorization: Bearer <votre_token>
{
  "nom": "Ma Config Gaming",
  "composants": [
    {
      "composant": "<id_composant>",
      "quantite": 1,
      "prixUnitaire": 450.99
    }
  ]
}
\`\`\`

### 4. Exporter en PDF
\`\`\`bash
GET http://localhost:3000/api/configurations/<id_config>/export
Headers: Authorization: Bearer <votre_token>
\`\`\`

## 🔧 Dépannage

### MongoDB ne démarre pas
\`\`\`bash
# Vérifier le statut
mongosh --eval "db.adminCommand('ping')"

# Redémarrer MongoDB (Windows)
net stop MongoDB
net start MongoDB
\`\`\`

### Port 3000 déjà utilisé
Modifier dans .env :
\`\`\`
PORT=3001
\`\`\`

### Erreur de connexion MongoDB
Vérifier MONGODB_URI dans .env :
\`\`\`
MONGODB_URI=mongodb://localhost:27017/configurateur_pc
\`\`\`

### Les tests échouent
\`\`\`bash
# Assurez-vous que MongoDB tourne
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm test
\`\`\`

## 📚 Ressources

- Documentation Swagger : http://localhost:3000/api-docs
- README complet : [README.md](README.md)
- Documentation détaillée : [DOCUMENTATION.md](DOCUMENTATION.md)
- Guide de contribution : [CONTRIBUTING.md](CONTRIBUTING.md)

## ✅ Checklist de Démarrage

- [ ] MongoDB installé et démarré
- [ ] Dépendances npm installées
- [ ] Fichier .env configuré
- [ ] Base de données peuplée (npm run seed)
- [ ] API démarrée (npm run dev)
- [ ] Tests exécutés avec succès (npm test)
- [ ] Documentation Swagger accessible

## 🎉 C'est parti !

Votre API est maintenant prête à l'emploi. Consultez la documentation Swagger pour explorer tous les endpoints disponibles.

Pour toute question : support@configurateurpc.com
