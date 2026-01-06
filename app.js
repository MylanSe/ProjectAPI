require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/database');
const swaggerSpec = require('./config/swagger');

// Importer les routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const componentRoutes = require('./routes/components');
const merchantRoutes = require('./routes/merchants');
const configurationRoutes = require('./routes/configurations');

// Initialiser l'application Express
const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API ConfigurateurPC.com',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API ConfigurateurPC - Documentation'
}));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/configurations', configurationRoutes);

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 3000;

// Démarrer le serveur seulement si ce n'est pas un test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Documentation disponible sur http://localhost:${PORT}/api-docs`);
  });
}

module.exports = app;
