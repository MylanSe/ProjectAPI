const mongoose = require('mongoose');

const configurationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nom: {
    type: String,
    required: [true, 'Le nom de la configuration est requis'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  composants: [{
    composant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Component',
      required: true
    },
    quantite: {
      type: Number,
      default: 1,
      min: 1
    },
    prixUnitaire: {
      type: Number,
      required: true
    },
    marchandSelectionne: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant'
    }
  }],
  coutTotal: {
    type: Number,
    default: 0
  },
  dateCreation: {
    type: Date,
    default: Date.now
  },
  dateModification: {
    type: Date,
    default: Date.now
  }
});

// Calculer le coût total avant sauvegarde
configurationSchema.pre('save', function() {
  this.coutTotal = this.composants.reduce((total, item) => {
    return total + (item.prixUnitaire * item.quantite);
  }, 0);
  this.dateModification = Date.now();
});

module.exports = mongoose.model('Configuration', configurationSchema);
