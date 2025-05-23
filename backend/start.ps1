# backend/start.ps1

# Active l’environnement virtuel
.\.venv\Scripts\Activate.ps1

# Définit le nom de l'application Flask
$env:FLASK_APP = "app.py"

# Lance le serveur Flask
flask run
