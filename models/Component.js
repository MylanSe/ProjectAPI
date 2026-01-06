const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La catégorie est requise']
  },
  marque: {
    type: String,
    required: [true, 'La marque est requise'],
    trim: true
  },
  titre: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  modele: {
    type: String,
    trim: true
  },
  specifications: {
    type: Map,
    of: String
  },
  image: {
    type: String,
    default: ''
  },
  prixBase: {
    type: Number,
    required: [true, 'Le prix de base est requis'],
    min: 0
  },
  disponible: {
    type: Boolean,
    default: true
  },
  prixMarchands: [{
    marchand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant'
    },
    prix: {
      type: Number,
      required: true,
      min: 0
    },
    url: String,
    enStock: {
      type: Boolean,
      default: true
    },
    derniereMiseAJour: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Mettre à jour la date de modification
componentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Component', componentSchema);
