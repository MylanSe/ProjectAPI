require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const User = require('./models/User');
const Category = require('./models/Category');
const Component = require('./models/Component');
const Merchant = require('./models/Merchant');
const Configuration = require('./models/Configuration');

const seedDatabase = async () => {
  try {
    // Connexion à la base de données
    await connectDB();

    // Nettoyer la base de données
    console.log('🗑️  Nettoyage de la base de données...');
    await User.deleteMany({});
    await Category.deleteMany({});
    await Component.deleteMany({});
    await Merchant.deleteMany({});
    await Configuration.deleteMany({});

    // Créer un utilisateur admin
    console.log('👤 Création de l\'utilisateur admin...');
    const admin = await User.create({
      nom: 'Admin',
      prenom: 'Super',
      email: 'admin@configurateurpc.com',
      password: 'Admin123!',
      role: 'admin'
    });

    // Créer un utilisateur standard
    const user = await User.create({
      nom: 'Dupont',
      prenom: 'Jean',
      email: 'jean.dupont@email.com',
      password: 'password123',
      role: 'user'
    });

    // Créer des catégories
    console.log('📂 Création des catégories...');
    const categories = await Category.create([
      { nom: 'CPU', description: 'Processeurs' },
      { nom: 'GPU', description: 'Cartes graphiques' },
      { nom: 'RAM', description: 'Mémoire vive' },
      { nom: 'Stockage', description: 'Disques durs et SSD' },
      { nom: 'Carte Mère', description: 'Cartes mères' },
      { nom: 'Boîtier', description: 'Boîtiers PC' },
      { nom: 'Alimentation', description: 'Blocs d\'alimentation' },
      { nom: 'Refroidissement', description: 'Solutions de refroidissement' }
    ]);

    // Créer des marchands
    console.log('🏪 Création des marchands...');
    const merchants = await Merchant.create([
      {
        nom: 'LDLC',
        url: 'https://www.ldlc.com',
        affiliation: {
          tauxCommission: 3,
          conditions: 'Commission sur toutes les ventes PC'
        },
        actif: true
      },
      {
        nom: 'TopAchat',
        url: 'https://www.topachat.com',
        affiliation: {
          tauxCommission: 4,
          conditions: 'Commission variable selon catégorie'
        },
        actif: true
      },
      {
        nom: 'Amazon',
        url: 'https://www.amazon.fr',
        affiliation: {
          tauxCommission: 5,
          conditions: 'Programme partenaires Amazon'
        },
        actif: true
      }
    ]);

    // Créer des composants
    console.log('🔧 Création des composants...');
    const cpuCategory = categories.find(c => c.nom === 'CPU');
    const gpuCategory = categories.find(c => c.nom === 'GPU');
    const ramCategory = categories.find(c => c.nom === 'RAM');
    const storageCategory = categories.find(c => c.nom === 'Stockage');

    const components = await Component.insertMany([
      // CPU
      {
        categorie: cpuCategory._id,
        marque: 'Intel',
        titre: 'Core i7-13700K',
        description: 'Processeur 16 cœurs (8P+8E) / 24 threads - Socket 1700',
        modele: 'i7-13700K',
        prixBase: 450.99,
        specifications: {
          cores: '16',
          threads: '24',
          baseFrequency: '3.4 GHz',
          turboFrequency: '5.4 GHz',
          socket: 'LGA 1700',
          tdp: '125W'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[0]._id, prix: 439.99, url: 'https://ldlc.com/i7-13700k', enStock: true },
          { marchand: merchants[1]._id, prix: 445.00, url: 'https://topachat.com/i7-13700k', enStock: true },
          { marchand: merchants[2]._id, prix: 455.90, url: 'https://amazon.fr/i7-13700k', enStock: true }
        ]
      },
      {
        categorie: cpuCategory._id,
        marque: 'AMD',
        titre: 'Ryzen 7 7800X3D',
        description: 'Processeur 8 cœurs / 16 threads avec 3D V-Cache',
        modele: '7800X3D',
        prixBase: 479.99,
        specifications: {
          cores: '8',
          threads: '16',
          baseFrequency: '4.2 GHz',
          turboFrequency: '5.0 GHz',
          socket: 'AM5',
          cache: '96MB 3D V-Cache'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[0]._id, prix: 469.99, url: 'https://ldlc.com/7800x3d', enStock: true },
          { marchand: merchants[2]._id, prix: 475.00, url: 'https://amazon.fr/7800x3d', enStock: false }
        ]
      },
      // GPU
      {
        categorie: gpuCategory._id,
        marque: 'NVIDIA',
        titre: 'GeForce RTX 4070 Ti',
        description: 'Carte graphique 12 GB GDDR6X',
        modele: 'RTX 4070 Ti',
        prixBase: 899.99,
        specifications: {
          memory: '12 GB GDDR6X',
          coreClock: '2310 MHz',
          boostClock: '2610 MHz',
          interface: 'PCIe 4.0',
          outputs: '3x DisplayPort 1.4a, 1x HDMI 2.1'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[0]._id, prix: 879.99, url: 'https://ldlc.com/rtx4070ti', enStock: true },
          { marchand: merchants[1]._id, prix: 889.00, url: 'https://topachat.com/rtx4070ti', enStock: true }
        ]
      },
      {
        categorie: gpuCategory._id,
        marque: 'AMD',
        titre: 'Radeon RX 7900 XT',
        description: 'Carte graphique 20 GB GDDR6',
        modele: 'RX 7900 XT',
        prixBase: 849.99,
        specifications: {
          memory: '20 GB GDDR6',
          gameClock: '2000 MHz',
          boostClock: '2400 MHz',
          interface: 'PCIe 4.0',
          outputs: '2x DisplayPort 2.1, 1x HDMI 2.1'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[0]._id, prix: 839.99, url: 'https://ldlc.com/rx7900xt', enStock: true }
        ]
      },
      // RAM
      {
        categorie: ramCategory._id,
        marque: 'Corsair',
        titre: 'Vengeance DDR5 32GB (2x16GB) 6000MHz',
        description: 'Kit mémoire DDR5 haute performance',
        modele: 'CMK32GX5M2D6000C36',
        prixBase: 159.99,
        specifications: {
          capacity: '32 GB (2x16GB)',
          type: 'DDR5',
          frequency: '6000 MHz',
          latency: 'CL36',
          voltage: '1.35V'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[0]._id, prix: 149.99, url: 'https://ldlc.com/vengeance-ddr5', enStock: true },
          { marchand: merchants[2]._id, prix: 155.00, url: 'https://amazon.fr/vengeance-ddr5', enStock: true }
        ]
      },
      {
        categorie: ramCategory._id,
        marque: 'G.Skill',
        titre: 'Trident Z5 RGB 32GB (2x16GB) 6400MHz',
        description: 'Kit mémoire DDR5 avec RGB',
        modele: 'F5-6400J3239G16GX2-TZ5RK',
        prixBase: 189.99,
        specifications: {
          capacity: '32 GB (2x16GB)',
          type: 'DDR5',
          frequency: '6400 MHz',
          latency: 'CL32',
          rgb: 'Oui'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[1]._id, prix: 179.99, url: 'https://topachat.com/tridentz5', enStock: true }
        ]
      },
      // Stockage
      {
        categorie: storageCategory._id,
        marque: 'Samsung',
        titre: '990 PRO 2TB NVMe M.2',
        description: 'SSD NVMe PCIe 4.0 ultra-rapide',
        modele: '990 PRO',
        prixBase: 199.99,
        specifications: {
          capacity: '2 TB',
          interface: 'NVMe PCIe Gen 4.0 x4',
          formFactor: 'M.2 2280',
          readSpeed: '7450 MB/s',
          writeSpeed: '6900 MB/s'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[0]._id, prix: 189.99, url: 'https://ldlc.com/990pro', enStock: true },
          { marchand: merchants[2]._id, prix: 194.90, url: 'https://amazon.fr/990pro', enStock: true }
        ]
      },
      {
        categorie: storageCategory._id,
        marque: 'Western Digital',
        titre: 'WD Black SN850X 1TB',
        description: 'SSD NVMe PCIe 4.0 gaming',
        modele: 'SN850X',
        prixBase: 109.99,
        specifications: {
          capacity: '1 TB',
          interface: 'NVMe PCIe Gen 4.0 x4',
          formFactor: 'M.2 2280',
          readSpeed: '7300 MB/s',
          writeSpeed: '6300 MB/s'
        },
        disponible: true,
        prixMarchands: [
          { marchand: merchants[1]._id, prix: 99.99, url: 'https://topachat.com/sn850x', enStock: true }
        ]
      }
    ]);

    // Créer une configuration exemple
    console.log('💻 Création d\'une configuration exemple...');
    await Configuration.create({
      utilisateur: user._id,
      nom: 'Gaming PC Ultime 2024',
      description: 'Configuration gaming haut de gamme pour tous les jeux AAA',
      composants: [
        {
          composant: components[0]._id, // Intel i7-13700K
          quantite: 1,
          prixUnitaire: 439.99,
          marchandSelectionne: merchants[0]._id
        },
        {
          composant: components[2]._id, // RTX 4070 Ti
          quantite: 1,
          prixUnitaire: 879.99,
          marchandSelectionne: merchants[0]._id
        },
        {
          composant: components[4]._id, // Corsair DDR5 32GB
          quantite: 1,
          prixUnitaire: 149.99,
          marchandSelectionne: merchants[0]._id
        },
        {
          composant: components[6]._id, // Samsung 990 PRO
          quantite: 1,
          prixUnitaire: 189.99,
          marchandSelectionne: merchants[0]._id
        }
      ]
    });

    console.log('✅ Base de données peuplée avec succès !');
    console.log('\n📊 Résumé :');
    console.log(`   - ${await User.countDocuments()} utilisateurs`);
    console.log(`   - ${await Category.countDocuments()} catégories`);
    console.log(`   - ${await Component.countDocuments()} composants`);
    console.log(`   - ${await Merchant.countDocuments()} marchands`);
    console.log(`   - ${await Configuration.countDocuments()} configurations`);
    console.log('\n👤 Compte admin :');
    console.log('   Email: admin@configurateurpc.com');
    console.log('   Password: Admin123!');
    console.log('\n👤 Compte utilisateur :');
    console.log('   Email: jean.dupont@email.com');
    console.log('   Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base de données:', error);
    process.exit(1);
  }
};

seedDatabase();
