const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Obtenir toutes les catégories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *   post:
 *     summary: Créer une nouvelle catégorie (Admin uniquement)
 *     tags: [Categories]
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
 *             properties:
 *               nom:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Catégorie créée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 */
router.route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtenir une catégorie par ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Catégorie trouvée
 *       404:
 *         description: Catégorie non trouvée
 *   put:
 *     summary: Mettre à jour une catégorie (Admin uniquement)
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: Catégorie mise à jour
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Catégorie non trouvée
 *   delete:
 *     summary: Supprimer une catégorie (Admin uniquement)
 *     tags: [Categories]
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
 *         description: Catégorie supprimée
 *       401:
 *         description: Non authentifié
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Catégorie non trouvée
 */
router.route('/:id')
  .get(getCategory)
  .put(protect, authorize('admin'), updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

module.exports = router;
