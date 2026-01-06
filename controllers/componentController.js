const Component = require('../models/Component');

// @desc    Créer un composant
// @route   POST /api/components
// @access  Private/Admin
exports.createComponent = async (req, res) => {
  try {
    const component = await Component.create(req.body);
    await component.populate('categorie');

    res.status(201).json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du composant',
      error: error.message
    });
  }
};

// @desc    Obtenir tous les composants
// @route   GET /api/components
// @access  Public
exports.getComponents = async (req, res) => {
  try {
    let query = {};

    // Filtrer par catégorie
    if (req.query.categorie) {
      query.categorie = req.query.categorie;
    }

    // Filtrer par marque
    if (req.query.marque) {
      query.marque = new RegExp(req.query.marque, 'i');
    }

    // Filtrer par disponibilité
    if (req.query.disponible) {
      query.disponible = req.query.disponible === 'true';
    }

    const components = await Component.find(query)
      .populate('categorie')
      .populate('prixMarchands.marchand');

    res.status(200).json({
      success: true,
      count: components.length,
      data: components
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des composants',
      error: error.message
    });
  }
};

// @desc    Obtenir un composant par ID
// @route   GET /api/components/:id
// @access  Public
exports.getComponent = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id)
      .populate('categorie')
      .populate('prixMarchands.marchand');

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Composant non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du composant',
      error: error.message
    });
  }
};

// @desc    Mettre à jour un composant
// @route   PUT /api/components/:id
// @access  Private/Admin
exports.updateComponent = async (req, res) => {
  try {
    const component = await Component.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('categorie').populate('prixMarchands.marchand');

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Composant non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du composant',
      error: error.message
    });
  }
};

// @desc    Supprimer un composant
// @route   DELETE /api/components/:id
// @access  Private/Admin
exports.deleteComponent = async (req, res) => {
  try {
    const component = await Component.findByIdAndDelete(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Composant non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Composant supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du composant',
      error: error.message
    });
  }
};

// @desc    Ajouter un prix marchand à un composant
// @route   POST /api/components/:id/prices
// @access  Private/Admin
exports.addMerchantPrice = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Composant non trouvé'
      });
    }

    component.prixMarchands.push(req.body);
    await component.save();
    await component.populate('prixMarchands.marchand');

    res.status(200).json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout du prix marchand',
      error: error.message
    });
  }
};

// @desc    Mettre à jour un prix marchand
// @route   PUT /api/components/:id/prices/:priceId
// @access  Private/Admin
exports.updateMerchantPrice = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Composant non trouvé'
      });
    }

    const priceIndex = component.prixMarchands.findIndex(
      p => p._id.toString() === req.params.priceId
    );

    if (priceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Prix marchand non trouvé'
      });
    }

    component.prixMarchands[priceIndex] = {
      ...component.prixMarchands[priceIndex].toObject(),
      ...req.body,
      derniereMiseAJour: Date.now()
    };

    await component.save();
    await component.populate('prixMarchands.marchand');

    res.status(200).json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du prix marchand',
      error: error.message
    });
  }
};

// @desc    Supprimer un prix marchand
// @route   DELETE /api/components/:id/prices/:priceId
// @access  Private/Admin
exports.deleteMerchantPrice = async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);

    if (!component) {
      return res.status(404).json({
        success: false,
        message: 'Composant non trouvé'
      });
    }

    component.prixMarchands = component.prixMarchands.filter(
      p => p._id.toString() !== req.params.priceId
    );

    await component.save();

    res.status(200).json({
      success: true,
      data: component
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du prix marchand',
      error: error.message
    });
  }
};
