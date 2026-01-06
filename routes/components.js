const express = require('express');
const router = express.Router();
const {
  createComponent,
  getComponents,
  getComponent,
  updateComponent,
  deleteComponent,
  addMerchantPrice,
  updateMerchantPrice,
  deleteMerchantPrice
} = require('../controllers/componentController');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /api/components:
 *   get:
 *     summary: Obtenir tous les composants
 *     tags: [Components]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *     responses:
 *       200:
 *         description: Liste des composants
 *   post:
 *     summary: Créer un nouveau composant (Admin uniquement)
 *     tags: [Components]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categorie
 *               - marque
 *               - titre
 *               - prixBase
 *             properties:
 *               categorie:
 *                 type: string
 *               marque:
 *                 type: string
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               modele:
 *                 type: string
 *               specifications:
 *                 type: object
 *               prixBase:
 *                 type: number
 *     responses:
 *       201:
 *         description: Composant créé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */
router.route('/')
  .get(getComponents)
  .post(protect, authorize('admin'), createComponent);

/**
 * @swagger
 * /api/components/{id}:
 *   get:
 *     summary: Obtenir un composant par ID
 *     tags: [Components]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Composant trouvé
 *       404:
 *         description: Composant non trouvé
 *   put:
 *     summary: Mettre à jour un composant (Admin uniquement)
 *     tags: [Components]
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
 *               marque:
 *                 type: string
 *               titre:
 *                 type: string
 *               description:
 *                 type: string
 *               prixBase:
 *                 type: number
 *     responses:
 *       200:
 *         description: Composant mis à jour
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Composant non trouvé
 *   delete:
 *     summary: Supprimer un composant (Admin uniquement)
 *     tags: [Components]
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
 *         description: Composant supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Composant non trouvé
 */
router.route('/:id')
  .get(getComponent)
  .put(protect, authorize('admin'), updateComponent)
  .delete(protect, authorize('admin'), deleteComponent);

/**
 * @swagger
 * /api/components/{id}/prices:
 *   post:
 *     summary: Ajouter un prix marchand (Admin uniquement)
 *     tags: [Components]
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
 *             required:
 *               - marchand
 *               - prix
 *             properties:
 *               marchand:
 *                 type: string
 *               prix:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Prix ajouté
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */
router.route('/:id/prices')
  .post(protect, authorize('admin'), addMerchantPrice);

/**
 * @swagger
 * /api/components/{id}/prices/{priceId}:
 *   put:
 *     summary: Mettre à jour un prix marchand (Admin uniquement)
 *     tags: [Components]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: priceId
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
 *               prix:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Prix mis à jour
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *   delete:
 *     summary: Supprimer un prix marchand (Admin uniquement)
 *     tags: [Components]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: priceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prix supprimé
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */
router.route('/:id/prices/:priceId')
  .put(protect, authorize('admin'), updateMerchantPrice)
  .delete(protect, authorize('admin'), deleteMerchantPrice);

module.exports = router;
