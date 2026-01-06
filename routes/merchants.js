const express = require('express');
const router = express.Router();
const {
  createMerchant,
  getMerchants,
  getMerchant,
  updateMerchant,
  deleteMerchant
} = require('../controllers/merchantController');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /api/merchants:
 *   get:
 *     summary: Obtenir tous les marchands
 *     tags: [Merchants]
 *     responses:
 *       200:
 *         description: Liste des marchands
 *   post:
 *     summary: Créer un nouveau marchand (Admin uniquement)
 *     tags: [Merchants]
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
 *               - url
 *             properties:
 *               nom:
 *                 type: string
 *               url:
 *                 type: string
 *               logo:
 *                 type: string
 *               affiliation:
 *                 type: object
 *               actif:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Marchand créé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */
router.route('/')
  .get(getMerchants)
  .post(protect, authorize('admin'), createMerchant);

/**
 * @swagger
 * /api/merchants/{id}:
 *   get:
 *     summary: Obtenir un marchand par ID
 *     tags: [Merchants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Marchand trouvé
 *       404:
 *         description: Marchand non trouvé
 *   put:
 *     summary: Mettre à jour un marchand (Admin uniquement)
 *     tags: [Merchants]
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
 *               url:
 *                 type: string
 *               logo:
 *                 type: string
 *               affiliation:
 *                 type: object
 *               actif:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Marchand mis à jour
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Marchand non trouvé
 *   delete:
 *     summary: Supprimer un marchand (Admin uniquement)
 *     tags: [Merchants]
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
 *         description: Marchand supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Marchand non trouvé
 */
router.route('/:id')
  .get(getMerchant)
  .put(protect, authorize('admin'), updateMerchant)
  .delete(protect, authorize('admin'), deleteMerchant);

module.exports = router;
