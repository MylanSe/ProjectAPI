<script setup>
</script>

<template>
  <div class="container">
    <h1>Panel Admin</h1>
    <div class="grille">
      <a href="/admin/composants" class="carte">
        <h2>Composants</h2>
        <p>Gérer le catalogue de composants</p>
      </a>
      <a href="/admin/categories" class="carte">
        <h2>Catégories</h2>
        <p>Gérer les catégories</p>
      </a>
      <a href="/admin/marchands" class="carte">
        <h2>Marchands</h2>
        <p>Gérer les marchands partenaires</p>
      </a>
      <a href="/admin/utilisateurs" class="carte">
        <h2>Utilisateurs</h2>
        <p>Voir tous les utilisateurs</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 20px; }
.carte { border: 1px solid #ccc; border-radius: 8px; padding: 24px; text-decoration: none; color: inherit; transition: border-color 0.2s; }
.carte:hover { border-color: #42b883; }
.carte h2 { margin-bottom: 8px; }
.carte p { color: #666; font-size: 0.9em; }
</style>