# 🐳 Guide Docker pour ConfigurateurPC API

## 📋 Prérequis

- Docker Desktop installé et en cours d'exécution
- Docker Compose (inclus avec Docker Desktop)

## 🚀 Démarrage rapide

### Mode Production

```powershell
# Démarrer les services (MongoDB + API)
docker-compose up -d

# Vérifier que les conteneurs sont en cours d'exécution
docker-compose ps

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime la base de données)
docker-compose down -v
```

### Mode Développement (avec hot-reload)

```powershell
# Démarrer en mode développement
docker-compose -f docker-compose.dev.yml up -d

# Voir les logs en temps réel
docker-compose -f docker-compose.dev.yml logs -f app

# Arrêter
docker-compose -f docker-compose.dev.yml down
```

## 🌱 Peupler la base de données

Après le premier démarrage, vous devez peupler la base de données :

```powershell
# Exécuter le script seed dans le conteneur
docker-compose exec app npm run seed
```

## 🔧 Commandes utiles

### Gestion des conteneurs

```powershell
# Redémarrer uniquement l'application
docker-compose restart app

# Reconstruire l'image de l'application
docker-compose build app

# Reconstruire et redémarrer
docker-compose up -d --build

# Voir les logs d'un service spécifique
docker-compose logs -f mongodb
docker-compose logs -f app
```

### Accès aux conteneurs

```powershell
# Accéder au shell du conteneur de l'application
docker-compose exec app sh

# Accéder à MongoDB en ligne de commande
docker-compose exec mongodb mongosh -u admin -p admin123 --authenticationDatabase admin

# Utiliser MongoDB sans authentification (si besoin)
docker-compose exec mongodb mongosh configurateur_pc
```

### Exécuter des commandes dans le conteneur

```powershell
# Exécuter les tests
docker-compose exec app npm test

# Installer une nouvelle dépendance
docker-compose exec app npm install nom-du-package

# Voir les variables d'environnement
docker-compose exec app env
```

## 📊 Accès aux services

| Service | URL | Identifiants |
|---------|-----|--------------|
| API | http://localhost:3000 | - |
| MongoDB | localhost:27017 | admin / admin123 |
| Swagger | http://localhost:3000/api-docs | - |

## 🔐 Comptes par défaut (après seed)

**Admin:**
- Email: admin@configurateurpc.com
- Password: Admin123!

**Utilisateur:**
- Email: jean.dupont@email.com
- Password: password123

## 🗄️ Gestion des données

### Sauvegarder la base de données

```powershell
# Créer un backup
docker-compose exec mongodb mongodump --uri="mongodb://admin:admin123@localhost:27017/configurateur_pc?authSource=admin" --out=/backup

# Copier le backup hors du conteneur
docker cp configurateur_pc_mongodb:/backup ./backup
```

### Restaurer la base de données

```powershell
# Copier le backup dans le conteneur
docker cp ./backup configurateur_pc_mongodb:/backup

# Restaurer
docker-compose exec mongodb mongorestore --uri="mongodb://admin:admin123@localhost:27017/configurateur_pc?authSource=admin" /backup/configurateur_pc
```

## 🛠️ Dépannage

### Les conteneurs ne démarrent pas

```powershell
# Vérifier les logs pour les erreurs
docker-compose logs

# Vérifier l'état des conteneurs
docker-compose ps

# Nettoyer et redémarrer
docker-compose down -v
docker-compose up -d
```

### L'application ne se connecte pas à MongoDB

Vérifiez que :
1. Le conteneur MongoDB est démarré : `docker-compose ps`
2. Les logs MongoDB ne montrent pas d'erreurs : `docker-compose logs mongodb`
3. La variable MONGODB_URI est correcte dans docker-compose.yml

### Port déjà utilisé

Si le port 3000 ou 27017 est déjà utilisé :

```powershell
# Modifier les ports dans docker-compose.yml
# Par exemple, changer "3000:3000" en "3001:3000"
```

### Rebuild complet

```powershell
# Tout supprimer et recommencer
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
docker-compose exec app npm run seed
```

## 📝 Personnalisation

### Modifier les variables d'environnement

Éditez les variables dans `docker-compose.yml` ou créez un fichier `.env` :

```dotenv
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/configurateur_pc?authSource=admin
JWT_SECRET=votre_secret_personnalise
```

Puis modifiez docker-compose.yml pour utiliser le fichier .env :

```yaml
app:
  env_file:
    - .env
```

### Changer les credentials MongoDB

Modifiez dans `docker-compose.yml` :

```yaml
mongodb:
  environment:
    MONGO_INITDB_ROOT_USERNAME: votre_user
    MONGO_INITDB_ROOT_PASSWORD: votre_password
```

Et mettez à jour MONGODB_URI dans le service app en conséquence.

## 🏗️ Architecture

```
┌─────────────────┐
│   Application   │
│   Node.js API   │
│   Port: 3000    │
└────────┬────────┘
         │
         │ Network: configurateur_network
         │
┌────────▼────────┐
│    MongoDB      │
│   Port: 27017   │
│   Volume: data  │
└─────────────────┘
```

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Docker Compose](https://docs.docker.com/compose/)
- [Documentation MongoDB Docker](https://hub.docker.com/_/mongo)
