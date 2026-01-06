const Configuration = require('../models/Configuration');
const User = require('../models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// @desc    Créer une configuration
// @route   POST /api/configurations
// @access  Private
exports.createConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.create({
      ...req.body,
      utilisateur: req.user.id
    });

    // Ajouter la configuration à l'utilisateur
    await User.findByIdAndUpdate(req.user.id, {
      $push: { configurations: configuration._id }
    });

    await configuration.populate('composants.composant composants.marchandSelectionne');

    res.status(201).json({
      success: true,
      data: configuration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la configuration',
      error: error.message
    });
  }
};

// @desc    Obtenir toutes les configurations
// @route   GET /api/configurations
// @access  Private
exports.getConfigurations = async (req, res) => {
  try {
    let query = {};

    // Si l'utilisateur n'est pas admin, ne montrer que ses configurations
    if (req.user.role !== 'admin') {
      query.utilisateur = req.user.id;
    }

    // Filtrer par utilisateur (pour admin)
    if (req.query.utilisateur && req.user.role === 'admin') {
      query.utilisateur = req.query.utilisateur;
    }

    const configurations = await Configuration.find(query)
      .populate('utilisateur', 'nom prenom email')
      .populate('composants.composant')
      .populate('composants.marchandSelectionne')
      .sort('-dateCreation');

    res.status(200).json({
      success: true,
      count: configurations.length,
      data: configurations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des configurations',
      error: error.message
    });
  }
};

// @desc    Obtenir une configuration par ID
// @route   GET /api/configurations/:id
// @access  Private
exports.getConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findById(req.params.id)
      .populate('utilisateur', 'nom prenom email')
      .populate('composants.composant')
      .populate('composants.marchandSelectionne');

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée'
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (configuration.utilisateur._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à accéder à cette configuration'
      });
    }

    res.status(200).json({
      success: true,
      data: configuration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la configuration',
      error: error.message
    });
  }
};

// @desc    Mettre à jour une configuration
// @route   PUT /api/configurations/:id
// @access  Private
exports.updateConfiguration = async (req, res) => {
  try {
    let configuration = await Configuration.findById(req.params.id);

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée'
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (configuration.utilisateur.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à modifier cette configuration'
      });
    }

    configuration = await Configuration.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('composants.composant composants.marchandSelectionne');

    res.status(200).json({
      success: true,
      data: configuration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la configuration',
      error: error.message
    });
  }
};

// @desc    Supprimer une configuration
// @route   DELETE /api/configurations/:id
// @access  Private
exports.deleteConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.findById(req.params.id);

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée'
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (configuration.utilisateur.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à supprimer cette configuration'
      });
    }

    // Retirer la configuration de l'utilisateur
    await User.findByIdAndUpdate(configuration.utilisateur, {
      $pull: { configurations: configuration._id }
    });

    await Configuration.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
      message: 'Configuration supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la configuration',
      error: error.message
    });
  }
};

// @desc    Exporter une configuration en PDF
// @route   GET /api/configurations/:id/export
// @access  Private
exports.exportConfigurationPDF = async (req, res) => {
  try {
    const configuration = await Configuration.findById(req.params.id)
      .populate('utilisateur', 'nom prenom email')
      .populate('composants.composant')
      .populate('composants.marchandSelectionne');

    if (!configuration) {
      return res.status(404).json({
        success: false,
        message: 'Configuration non trouvée'
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (configuration.utilisateur._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Non autorisé à exporter cette configuration'
      });
    }

    // Créer le PDF
    const doc = new PDFDocument({ margin: 50 });
    
    // Headers pour le téléchargement
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=configuration-${configuration._id}.pdf`);
    
    doc.pipe(res);

    // Titre
    doc.fontSize(20).text('Configuration PC', { align: 'center' });
    doc.moveDown();

    // Informations de la configuration
    doc.fontSize(14).text(`Nom: ${configuration.nom}`, { underline: true });
    doc.fontSize(10).text(`Description: ${configuration.description || 'N/A'}`);
    doc.text(`Date de création: ${new Date(configuration.dateCreation).toLocaleDateString('fr-FR')}`);
    doc.text(`Utilisateur: ${configuration.utilisateur.prenom} ${configuration.utilisateur.nom}`);
    doc.moveDown();

    // Liste des composants
    doc.fontSize(14).text('Composants:', { underline: true });
    doc.moveDown(0.5);

    configuration.composants.forEach((item, index) => {
      const composant = item.composant;
      doc.fontSize(10);
      doc.text(`${index + 1}. ${composant.marque} ${composant.titre}`, { continued: false });
      doc.text(`   Catégorie: ${composant.categorie || 'N/A'}`, { indent: 20 });
      doc.text(`   Prix unitaire: ${item.prixUnitaire.toFixed(2)}€`, { indent: 20 });
      doc.text(`   Quantité: ${item.quantite}`, { indent: 20 });
      doc.text(`   Sous-total: ${(item.prixUnitaire * item.quantite).toFixed(2)}€`, { indent: 20 });
      
      if (item.marchandSelectionne) {
        doc.text(`   Marchand: ${item.marchandSelectionne.nom}`, { indent: 20 });
      }
      
      doc.moveDown(0.5);
    });

    // Coût total
    doc.moveDown();
    doc.fontSize(14).text(`Coût Total: ${configuration.coutTotal.toFixed(2)}€`, { 
      align: 'right',
      underline: true 
    });

    // Pied de page
    doc.moveDown(2);
    doc.fontSize(8).text('ConfigurateurPC.com - Votre configuration personnalisée', {
      align: 'center'
    });

    doc.end();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'export PDF',
      error: error.message
    });
  }
};
