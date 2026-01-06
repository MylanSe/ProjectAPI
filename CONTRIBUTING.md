# Guide de Contribution

Merci de votre intérêt pour contribuer à l'API ConfigurateurPC.com ! 🎉

## Comment contribuer

### 1. Signaler un bug

Si vous trouvez un bug, veuillez créer une issue en incluant :
- Une description claire du problème
- Les étapes pour reproduire le bug
- Le comportement attendu vs le comportement actuel
- Des captures d'écran si pertinent
- Votre environnement (OS, version Node.js, etc.)

### 2. Proposer une nouvelle fonctionnalité

Pour proposer une nouvelle fonctionnalité :
1. Vérifiez d'abord qu'elle n'existe pas déjà dans les issues
2. Créez une issue détaillant la fonctionnalité souhaitée
3. Expliquez pourquoi cette fonctionnalité serait utile
4. Attendez les retours avant de commencer à coder

### 3. Soumettre une Pull Request

#### Processus

1. **Fork** le projet
2. **Clone** votre fork localement
   \`\`\`bash
   git clone https://github.com/votre-username/ProjetAPI.git
   \`\`\`

3. **Créez une branche** pour votre fonctionnalité
   \`\`\`bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   \`\`\`

4. **Installez les dépendances**
   \`\`\`bash
   npm install
   \`\`\`

5. **Faites vos modifications** en suivant les standards du projet

6. **Testez vos changements**
   \`\`\`bash
   npm test
   \`\`\`

7. **Commitez** vos changements avec un message descriptif
   \`\`\`bash
   git commit -m "feat: ajout de la fonctionnalité X"
   \`\`\`

8. **Pushez** vers votre fork
   \`\`\`bash
   git push origin feature/ma-nouvelle-fonctionnalite
   \`\`\`

9. **Créez une Pull Request** depuis votre fork vers le repo principal

#### Conventions de commit

Nous utilisons la convention [Conventional Commits](https://www.conventionalcommits.org/) :

- \`feat:\` Nouvelle fonctionnalité
- \`fix:\` Correction de bug
- \`docs:\` Documentation uniquement
- \`style:\` Formatage, points-virgules manquants, etc.
- \`refactor:\` Refactorisation du code
- \`test:\` Ajout ou modification de tests
- \`chore:\` Maintenance, mise à jour des dépendances

Exemples :
\`\`\`
feat: ajout de l'export Excel pour les configurations
fix: correction du calcul du coût total
docs: mise à jour du README avec les nouveaux endpoints
\`\`\`

## Standards de code

### JavaScript

- Utilisez ES6+ (async/await, arrow functions, etc.)
- Indentation : 2 espaces
- Pas de points-virgules (sauf nécessaire)
- Nommage :
  - Variables et fonctions : camelCase
  - Classes : PascalCase
  - Constantes : UPPER_CASE

### Structure des fichiers

- **Models** : Définitions Mongoose dans \`models/\`
- **Controllers** : Logique métier dans \`controllers/\`
- **Routes** : Définitions des routes dans \`routes/\`
- **Middleware** : Middleware personnalisés dans \`middleware/\`
- **Tests** : Tests Jest dans \`__tests__/\`

### Bonnes pratiques

1. **Toujours écrire des tests** pour vos nouvelles fonctionnalités
2. **Documenter** vos endpoints dans Swagger
3. **Gérer les erreurs** correctement avec try/catch
4. **Valider** les données d'entrée
5. **Utiliser** async/await plutôt que les callbacks
6. **Commenter** le code complexe
7. **Ne pas commiter** de fichiers sensibles (.env, node_modules, etc.)

### Exemple de contrôleur

\`\`\`javascript
// @desc    Description de la fonction
// @route   GET /api/resource/:id
// @access  Public/Private/Private-Admin
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Ressource non trouvée'
      });
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};
\`\`\`

### Exemple de test

\`\`\`javascript
describe('Resource Endpoints', () => {
  test('GET /api/resource/:id - Obtenir une ressource', async () => {
    const res = await request(app)
      .get(\`/api/resource/\${resourceId}\`)
      .set('Authorization', \`Bearer \${token}\`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('_id');
  });
});
\`\`\`

## Documentation

### Swagger

Documentez vos endpoints avec JSDoc :

\`\`\`javascript
/**
 * @swagger
 * /api/resource:
 *   get:
 *     summary: Obtenir toutes les ressources
 *     tags: [Resource]
 *     responses:
 *       200:
 *         description: Liste des ressources
 */
\`\`\`

### README

Mettez à jour le README.md si vous :
- Ajoutez de nouveaux endpoints
- Modifiez la structure du projet
- Ajoutez de nouvelles dépendances importantes

## Questions ?

N'hésitez pas à :
- Ouvrir une issue pour poser des questions
- Contacter l'équipe : support@configurateurpc.com

## Code de conduite

- Soyez respectueux et constructif
- Acceptez les critiques constructives
- Focalisez-vous sur ce qui est meilleur pour le projet
- Montrez de l'empathie envers les autres contributeurs

## Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet (ISC).

---

Merci pour vos contributions ! 🙏
