const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Category = require('../models/Category');
const Component = require('../models/Component');
const Merchant = require('../models/Merchant');
const Configuration = require('../models/Configuration');

let adminToken;
let userToken;
let userId;
let categoryId;
let componentId;
let merchantId;
let configurationId;

// Connexion à la base de données de test
beforeAll(async () => {
  const testDbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/configurateur_pc_test';
  await mongoose.connect(testDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Nettoyer la base de données après tous les tests
afterAll(async () => {
  await User.deleteMany({});
  await Category.deleteMany({});
  await Component.deleteMany({});
  await Merchant.deleteMany({});
  await Configuration.deleteMany({});
  await mongoose.connection.close();
});

describe('API Tests - ConfigurateurPC', () => {
  
  // ===== TESTS D'AUTHENTIFICATION =====
  describe('Auth Endpoints', () => {
    
    test('POST /api/auth/register - Inscription d\'un utilisateur', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          nom: 'Doe',
          prenom: 'John',
          email: 'john.doe@test.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('token');
      expect(res.body.data.user).toHaveProperty('email', 'john.doe@test.com');
      
      userToken = res.body.data.token;
      userId = res.body.data.user.id;
    });

    test('POST /api/auth/register - Inscription d\'un admin', async () => {
      const user = await User.create({
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin'
      });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@test.com',
          password: 'admin123'
        });

      expect(res.statusCode).toBe(200);
      adminToken = res.body.data.token;
    });

    test('POST /api/auth/login - Connexion avec email incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@test.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('POST /api/auth/login - Connexion avec mot de passe incorrect', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'john.doe@test.com',
          password: 'wrongpassword'
        });
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('GET /api/auth/me - Obtenir le profil utilisateur', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('email', 'john.doe@test.com');
    });
  });

  // ===== TESTS CATÉGORIES =====
  describe('Category Endpoints', () => {
    
    test('POST /api/categories - Créer une catégorie (admin)', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nom: 'CPU',
          description: 'Processeurs'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('nom', 'CPU');
      
      categoryId = res.body.data._id;
    });

    test('POST /api/categories - Créer une catégorie sans être admin', async () => {
      const res = await request(app)
        .post('/api/categories')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          nom: 'GPU',
          description: 'Cartes graphiques'
        });
      
      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });

    test('GET /api/categories - Obtenir toutes les catégories', async () => {
      const res = await request(app)
        .get('/api/categories');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('GET /api/categories/:id - Obtenir une catégorie', async () => {
      const res = await request(app)
        .get(`/api/categories/${categoryId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('nom', 'CPU');
    });

    test('PUT /api/categories/:id - Mettre à jour une catégorie', async () => {
      const res = await request(app)
        .put(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description: 'Processeurs Intel et AMD'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  // ===== TESTS MARCHANDS =====
  describe('Merchant Endpoints', () => {
    
    test('POST /api/merchants - Créer un marchand (admin)', async () => {
      const res = await request(app)
        .post('/api/merchants')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          nom: 'TechShop',
          url: 'https://techshop.com',
          affiliation: {
            tauxCommission: 5,
            conditions: 'Commission sur toutes les ventes'
          }
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('nom', 'TechShop');
      
      merchantId = res.body.data._id;
    });

    test('GET /api/merchants - Obtenir tous les marchands', async () => {
      const res = await request(app)
        .get('/api/merchants');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('GET /api/merchants/:id - Obtenir un marchand', async () => {
      const res = await request(app)
        .get(`/api/merchants/${merchantId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('nom', 'TechShop');
    });
  });

  // ===== TESTS COMPOSANTS =====
  describe('Component Endpoints', () => {
    
    test('POST /api/components - Créer un composant (admin)', async () => {
      const res = await request(app)
        .post('/api/components')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          categorie: categoryId,
          marque: 'Intel',
          titre: 'Core i7-13700K',
          description: 'Processeur 16 cœurs',
          modele: 'i7-13700K',
          prixBase: 450.99,
          specifications: {
            cores: '16',
            threads: '24',
            frequency: '3.4 GHz'
          }
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('marque', 'Intel');
      
      componentId = res.body.data._id;
    });

    test('GET /api/components - Obtenir tous les composants', async () => {
      const res = await request(app)
        .get('/api/components');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('GET /api/components?marque=Intel - Filtrer par marque', async () => {
      const res = await request(app)
        .get('/api/components?marque=Intel');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    test('GET /api/components/:id - Obtenir un composant', async () => {
      const res = await request(app)
        .get(`/api/components/${componentId}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('titre', 'Core i7-13700K');
    });

    test('POST /api/components/:id/prices - Ajouter un prix marchand', async () => {
      const res = await request(app)
        .post(`/api/components/${componentId}/prices`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          marchand: merchantId,
          prix: 439.99,
          url: 'https://techshop.com/i7-13700k',
          enStock: true
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  // ===== TESTS CONFIGURATIONS =====
  describe('Configuration Endpoints', () => {
    
    test('POST /api/configurations - Créer une configuration', async () => {
      const res = await request(app)
        .post('/api/configurations')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          nom: 'Gaming PC 2024',
          description: 'Configuration gaming haut de gamme',
          composants: [
            {
              composant: componentId,
              quantite: 1,
              prixUnitaire: 450.99,
              marchandSelectionne: merchantId
            }
          ]
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('nom', 'Gaming PC 2024');
      expect(res.body.data).toHaveProperty('coutTotal');
      
      configurationId = res.body.data._id;
    });

    test('GET /api/configurations - Obtenir les configurations de l\'utilisateur', async () => {
      const res = await request(app)
        .get('/api/configurations')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    test('GET /api/configurations/:id - Obtenir une configuration', async () => {
      const res = await request(app)
        .get(`/api/configurations/${configurationId}`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveProperty('nom', 'Gaming PC 2024');
    });

    test('PUT /api/configurations/:id - Mettre à jour une configuration', async () => {
      const res = await request(app)
        .put(`/api/configurations/${configurationId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          description: 'Configuration gaming ultra performante'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('GET /api/configurations/:id/export - Exporter en PDF', async () => {
      const res = await request(app)
        .get(`/api/configurations/${configurationId}/export`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.headers['content-type']).toBe('application/pdf');
    });
  });

  // ===== TESTS D'AUTORISATION =====
  describe('Authorization Tests', () => {
    
    test('Accès refusé sans token', async () => {
      const res = await request(app)
        .get('/api/auth/me');
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('Token invalide', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalidtoken123');
      
      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
    });

    test('Utilisateur non autorisé à supprimer une catégorie', async () => {
      const res = await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(403);
      expect(res.body.success).toBe(false);
    });
  });

  // ===== TESTS DE SUPPRESSION =====
  describe('Delete Endpoints', () => {
    
    test('DELETE /api/configurations/:id - Supprimer une configuration', async () => {
      const res = await request(app)
        .delete(`/api/configurations/${configurationId}`)
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('DELETE /api/components/:id - Supprimer un composant', async () => {
      const res = await request(app)
        .delete(`/api/components/${componentId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('DELETE /api/merchants/:id - Supprimer un marchand', async () => {
      const res = await request(app)
        .delete(`/api/merchants/${merchantId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    test('DELETE /api/categories/:id - Supprimer une catégorie', async () => {
      const res = await request(app)
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
