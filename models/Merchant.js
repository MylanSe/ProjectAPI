const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom du marchand est requis'],
    unique: true,
    trim: true
  },
  url: {
    type: String,
    required: [true, 'L\'URL du site est requise'],
    trim: true
  },
  logo: {
    type: String,
    default: ''
  },
  affiliation: {
    tauxCommission: {
      type: Number,
      min: 0,
      max: 100
    },
    conditions: String
  },
  actif: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Merchant', merchantSchema);
