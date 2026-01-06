const Merchant = require('../models/Merchant');

// @desc    Créer un partenaire marchand
// @route   POST /api/merchants
// @access  Private/Admin
exports.createMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.create(req.body);

    res.status(201).json({
      success: true,
      data: merchant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du marchand',
      error: error.message
    });
  }
};

// @desc    Obtenir tous les partenaires marchands
// @route   GET /api/merchants
// @access  Public
exports.getMerchants = async (req, res) => {
  try {
    let query = {};

    // Filtrer par actif
    if (req.query.actif !== undefined) {
      query.actif = req.query.actif === 'true';
    }

    const merchants = await Merchant.find(query);

    res.status(200).json({
      success: true,
      count: merchants.length,
      data: merchants
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des marchands',
      error: error.message
    });
  }
};

// @desc    Obtenir un partenaire marchand par ID
// @route   GET /api/merchants/:id
// @access  Public
exports.getMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Marchand non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: merchant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du marchand',
      error: error.message
    });
  }
};

// @desc    Mettre à jour un partenaire marchand
// @route   PUT /api/merchants/:id
// @access  Private/Admin
exports.updateMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Marchand non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: merchant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du marchand',
      error: error.message
    });
  }
};

// @desc    Supprimer un partenaire marchand
// @route   DELETE /api/merchants/:id
// @access  Private/Admin
exports.deleteMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findByIdAndDelete(req.params.id);

    if (!merchant) {
      return res.status(404).json({
        success: false,
        message: 'Marchand non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Marchand supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du marchand',
      error: error.message
    });
  }
};
