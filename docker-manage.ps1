# Script de gestion Docker pour ConfigurateurPC API
# Usage: .\docker-manage.ps1 [command]

param(
    [Parameter(Position=0)]
    [ValidateSet('start', 'stop', 'restart', 'logs', 'seed', 'clean', 'dev', 'build', 'status', 'help')]
    [string]$Command = 'help'
)

function Show-Help {
    Write-Host "🐳 Script de gestion Docker - ConfigurateurPC API" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Usage: .\docker-manage.ps1 [command]" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Commandes disponibles:" -ForegroundColor Green
    Write-Host "  start    - Démarrer les services en mode production" -ForegroundColor White
    Write-Host "  dev      - Démarrer les services en mode développement" -ForegroundColor White
    Write-Host "  stop     - Arrêter les services" -ForegroundColor White
    Write-Host "  restart  - Redémarrer les services" -ForegroundColor White
    Write-Host "  logs     - Afficher les logs en temps réel" -ForegroundColor White
    Write-Host "  seed     - Peupler la base de données" -ForegroundColor White
    Write-Host "  build    - Reconstruire les images Docker" -ForegroundColor White
    Write-Host "  status   - Afficher l'état des services" -ForegroundColor White
    Write-Host "  clean    - Arrêter et supprimer tous les volumes (⚠️  supprime les données)" -ForegroundColor White
    Write-Host "  help     - Afficher cette aide" -ForegroundColor White
    Write-Host ""
}

function Start-Services {
    Write-Host "🚀 Démarrage des services en mode production..." -ForegroundColor Cyan
    docker-compose up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Services démarrés avec succès!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Services disponibles:" -ForegroundColor Yellow
        Write-Host "   - API: http://localhost:3000" -ForegroundColor White
        Write-Host "   - Swagger: http://localhost:3000/api-docs" -ForegroundColor White
        Write-Host "   - MongoDB: localhost:27017" -ForegroundColor White
        Write-Host ""
        Write-Host "💡 Pensez à peupler la base de données avec: .\docker-manage.ps1 seed" -ForegroundColor Yellow
    }
}

function Start-DevServices {
    Write-Host "🔧 Démarrage des services en mode développement..." -ForegroundColor Cyan
    docker-compose -f docker-compose.dev.yml up -d
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Services démarrés en mode développement!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📊 Hot-reload activé - Les modifications seront automatiquement rechargées" -ForegroundColor Yellow
        Write-Host "   - API: http://localhost:3000" -ForegroundColor White
        Write-Host ""
        Write-Host "📝 Pour voir les logs: .\docker-manage.ps1 logs" -ForegroundColor Yellow
    }
}

function Stop-Services {
    Write-Host "🛑 Arrêt des services..." -ForegroundColor Cyan
    docker-compose down
    docker-compose -f docker-compose.dev.yml down 2>$null
    if ($LASTEXITCODE -eq 0 -or $LASTEXITCODE -eq 1) {
        Write-Host "✅ Services arrêtés!" -ForegroundColor Green
    }
}

function Restart-Services {
    Write-Host "🔄 Redémarrage des services..." -ForegroundColor Cyan
    docker-compose restart
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Services redémarrés!" -ForegroundColor Green
    }
}

function Show-Logs {
    Write-Host "📋 Affichage des logs (Ctrl+C pour quitter)..." -ForegroundColor Cyan
    docker-compose logs -f
}

function Seed-Database {
    Write-Host "🌱 Peuplement de la base de données..." -ForegroundColor Cyan
    docker-compose exec app npm run seed
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "✅ Base de données peuplée avec succès!" -ForegroundColor Green
    }
}

function Build-Images {
    Write-Host "🏗️  Reconstruction des images Docker..." -ForegroundColor Cyan
    docker-compose build --no-cache
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Images reconstruites!" -ForegroundColor Green
    }
}

function Show-Status {
    Write-Host "📊 État des services:" -ForegroundColor Cyan
    Write-Host ""
    docker-compose ps
}

function Clean-All {
    Write-Host "⚠️  ATTENTION: Cette opération va supprimer tous les conteneurs et volumes (données incluses)!" -ForegroundColor Red
    $confirmation = Read-Host "Êtes-vous sûr? (oui/non)"
    
    if ($confirmation -eq 'oui') {
        Write-Host "🧹 Nettoyage en cours..." -ForegroundColor Cyan
        docker-compose down -v
        docker-compose -f docker-compose.dev.yml down -v 2>$null
        Write-Host "✅ Nettoyage terminé!" -ForegroundColor Green
    } else {
        Write-Host "❌ Opération annulée" -ForegroundColor Yellow
    }
}

# Exécution de la commande
switch ($Command) {
    'start'   { Start-Services }
    'dev'     { Start-DevServices }
    'stop'    { Stop-Services }
    'restart' { Restart-Services }
    'logs'    { Show-Logs }
    'seed'    { Seed-Database }
    'build'   { Build-Images }
    'status'  { Show-Status }
    'clean'   { Clean-All }
    'help'    { Show-Help }
    default   { Show-Help }
}
