# 📚 Référence API - ConfigurateurPC

Documentation complète des endpoints de l'API.

**Base URL** : `http://localhost:3000/api`

## 🔐 Authentification

Toutes les routes protégées nécessitent un token JWT dans le header :
```
Authorization: Bearer <votre_token>
```

### Endpoints d'authentification

#### Inscription
```http
POST /auth/register
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "motDePasse": "Password123!"
}
```

#### Connexion
```http
POST /auth/login
Content-Type: application/json

{
  "email": "jean@example.com",
  "motDePasse": "Password123!"
}
```

**Réponse** :
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "_id": "...",
    "email": "jean@example.com",
    "role": "user"
  }
}
```

#### Profil utilisateur
```http
GET /auth/profile
Authorization: Bearer <token>
```

## 📦 Catégories

### Lister les catégories
```http
GET /categories
```

### Créer une catégorie (Admin)
```http
POST /categories
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nom": "Processeur",
  "description": "Unités centrales de traitement"
}
```

## 🔧 Composants

### Lister les composants
```http
GET /components
GET /components?categorie=<category_id>
GET /components?marque=Intel
```

### Obtenir un composant
```http
GET /components/:id
```

### Créer un composant (Admin)
```http
POST /components
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nom": "Intel Core i9-13900K",
  "categorie": "<category_id>",
  "marque": "Intel",
  "modele": "i9-13900K",
  "specifications": {
    "cores": "24",
    "threads": "32",
    "frequency": "3.0 GHz"
  },
  "prix": [
    {
      "marchand": "<merchant_id>",
      "prix": 649.99,
      "stock": 15,
      "url": "https://..."
    }
  ]
}
```

### Mettre à jour un composant (Admin)
```http
PUT /components/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nom": "Intel Core i9-13900K",
  "prix": [...],
  "disponible": true
}
```

### Supprimer un composant (Admin)
```http
DELETE /components/:id
Authorization: Bearer <admin_token>
```

## 🏪 Marchands

### Lister les marchands
```http
GET /merchants
GET /merchants?actif=true
```

### Créer un marchand (Admin)
```http
POST /merchants
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "nom": "LDLC",
  "url": "https://www.ldlc.com",
  "logo": "https://...",
  "commission": 5.5,
  "lienAffiliation": "https://...",
  "actif": true
}
```

## ⚙️ Configurations

### Mes configurations
```http
GET /configurations
Authorization: Bearer <token>
```

### Créer une configuration
```http
POST /configurations
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "PC Gaming Ultimate",
  "composants": [
    {
      "composant": "<component_id>",
      "quantite": 1,
      "prixUnitaire": 649.99,
      "marchand": "<merchant_id>"
    },
    {
      "composant": "<component_id>",
      "quantite": 2,
      "prixUnitaire": 89.99,
      "marchand": "<merchant_id>"
    }
  ]
}
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "nom": "PC Gaming Ultimate",
    "composants": [...],
    "coutTotal": 829.97,
    "utilisateur": "..."
  }
}
```

### Obtenir une configuration
```http
GET /configurations/:id
Authorization: Bearer <token>
```

### Export PDF
```http
GET /configurations/:id/export
Authorization: Bearer <token>
```

Retourne un fichier PDF téléchargeable.

### Mettre à jour une configuration
```http
PUT /configurations/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "nom": "PC Gaming Ultimate v2",
  "composants": [...]
}
```

### Supprimer une configuration
```http
DELETE /configurations/:id
Authorization: Bearer <token>
```

## 📊 Codes de Réponse HTTP

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé avec succès |
| 400 | Requête invalide |
| 401 | Non authentifié |
| 403 | Accès interdit (admin requis) |
| 404 | Ressource non trouvée |
| 500 | Erreur serveur |

## 🔒 Niveaux d'accès

| Niveau | Description |
|--------|-------------|
| Public | Accessible sans authentification |
| Private | Nécessite un token JWT |
| Admin | Nécessite un token JWT avec rôle admin |

## 💡 Exemples d'utilisation

### Créer une configuration complète

```javascript
// 1. Se connecter
const loginRes = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'jean@example.com',
    password: 'Password123!'
  })
});
const { token } = await loginRes.json();

// 2. Récupérer les composants
const componentsRes = await fetch('http://localhost:3000/api/components');
const components = await componentsRes.json();

// 3. Créer la configuration
const configRes = await fetch('http://localhost:3000/api/configurations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    nom: 'Mon PC Gaming',
    composants: [
      {
        composant: components.data[0]._id,
        quantite: 1,
        prixUnitaire: components.data[0].prix[0].prix,
        marchand: components.data[0].prix[0].marchand
      }
    ]
  })
});

// 4. Télécharger le PDF
const pdfRes = await fetch(
  `http://localhost:3000/api/configurations/${config._id}/export`,
  {
    headers: { 'Authorization': `Bearer ${token}` }
  }
);
const pdfBlob = await pdfRes.blob();
```

## 🧪 Tester avec cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@configurateurpc.com","password":"Admin123!"}'

# Lister les composants
curl http://localhost:3000/api/components

# Créer une configuration
curl -X POST http://localhost:3000/api/configurations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "nom": "Mon PC",
    "composants": [...]
  }'
```

## 📖 Plus d'informations

Pour une documentation interactive, utilisez Swagger UI :
```
http://localhost:3000/api-docs
```
