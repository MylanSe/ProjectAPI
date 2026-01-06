const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API ConfigurateurPC.com',
      version: '1.0.0',
      description: 'API RESTful pour la configuration de PC sur mesure',
      contact: {
        name: 'ConfigurateurPC Support',
        email: 'support@configurateurpc.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['nom', 'prenom', 'email', 'password'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom de l\'utilisateur'
            },
            prenom: {
              type: 'string',
              description: 'Prénom de l\'utilisateur'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email de l\'utilisateur'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Mot de passe (min 6 caractères)'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              default: 'user'
            }
          }
        },
        Category: {
          type: 'object',
          required: ['nom'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom de la catégorie'
            },
            description: {
              type: 'string',
              description: 'Description de la catégorie'
            },
            slug: {
              type: 'string',
              description: 'Slug généré automatiquement'
            }
          }
        },
        Component: {
          type: 'object',
          required: ['categorie', 'marque', 'titre', 'prixBase'],
          properties: {
            categorie: {
              type: 'string',
              description: 'ID de la catégorie'
            },
            marque: {
              type: 'string',
              description: 'Marque du composant'
            },
            titre: {
              type: 'string',
              description: 'Titre du composant'
            },
            description: {
              type: 'string',
              description: 'Description détaillée'
            },
            modele: {
              type: 'string',
              description: 'Modèle du composant'
            },
            specifications: {
              type: 'object',
              description: 'Spécifications techniques'
            },
            image: {
              type: 'string',
              description: 'URL de l\'image'
            },
            prixBase: {
              type: 'number',
              description: 'Prix de base du composant'
            },
            disponible: {
              type: 'boolean',
              default: true
            }
          }
        },
        Merchant: {
          type: 'object',
          required: ['nom', 'url'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom du marchand'
            },
            url: {
              type: 'string',
              description: 'URL du site marchand'
            },
            logo: {
              type: 'string',
              description: 'URL du logo'
            },
            affiliation: {
              type: 'object',
              properties: {
                tauxCommission: {
                  type: 'number',
                  description: 'Taux de commission'
                },
                conditions: {
                  type: 'string',
                  description: 'Conditions d\'affiliation'
                }
              }
            },
            actif: {
              type: 'boolean',
              default: true
            }
          }
        },
        Configuration: {
          type: 'object',
          required: ['nom', 'composants'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom de la configuration'
            },
            description: {
              type: 'string',
              description: 'Description de la configuration'
            },
            composants: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  composant: {
                    type: 'string',
                    description: 'ID du composant'
                  },
                  quantite: {
                    type: 'number',
                    default: 1
                  },
                  prixUnitaire: {
                    type: 'number'
                  },
                  marchandSelectionne: {
                    type: 'string',
                    description: 'ID du marchand'
                  }
                }
              }
            },
            coutTotal: {
              type: 'number',
              description: 'Coût total calculé automatiquement'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string'
            },
            error: {
              type: 'string'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Auth',
        description: 'Authentification et gestion des utilisateurs'
      },
      {
        name: 'Categories',
        description: 'Gestion des catégories de composants'
      },
      {
        name: 'Components',
        description: 'Gestion des composants matériels'
      },
      {
        name: 'Merchants',
        description: 'Gestion des partenaires marchands'
      },
      {
        name: 'Configurations',
        description: 'Gestion des configurations PC'
      }
    ]
  },
  apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);
