const express = require('express');
const router = express.Router();
const {
  createConfiguration,
  getConfigurations,
  getConfiguration,
  updateConfiguration,
  deleteConfiguration,
  exportConfigurationPDF
} = require('../controllers/configurationController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * /api/configurations:
 *   get:
 *     summary: Obtenir toutes mes configurations
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des configurations
 *       401:
 *         description: Non authentifié
 *   post:
 *     summary: Créer une nouvelle configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - composants
 *             properties:
 *               nom:
 *                 type: string
 *                 example: Ma Config Gaming
 *               description:
 *                 type: string
 *               composants:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     composant:
 *                       type: string
 *                     quantite:
 *                       type: number
 *                     prixUnitaire:
 *                       type: number
 *                     marchandSelectionne:
 *                       type: string
 *     responses:
 *       201:
 *         description: Configuration créée
 *       401:
 *         description: Non authentifié
 */
router.route('/')
  .get(protect, getConfigurations)
  .post(protect, createConfiguration);

/**
 * @swagger
 * /api/configurations/{id}:
 *   get:
 *     summary: Obtenir une configuration par ID
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuration trouvée
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Configuration non trouvée
 *   put:
 *     summary: Mettre à jour une configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *               composants:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Configuration mise à jour
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Configuration non trouvée
 *   delete:
 *     summary: Supprimer une configuration
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Configuration supprimée
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Configuration non trouvée
 */
router.route('/:id')
  .get(protect, getConfiguration)
  .put(protect, updateConfiguration)
  .delete(protect, deleteConfiguration);

/**
 * @swagger
 * /api/configurations/{id}/export:
 *   get:
 *     summary: Exporter une configuration en PDF
 *     tags: [Configurations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: PDF généré
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Non authentifié
 *       404:
 *         description: Configuration non trouvée
 */
router.get('/:id/export', protect, exportConfigurationPDF);

module.exports = router;
