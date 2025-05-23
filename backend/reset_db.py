# reset_db.py
from app import create_app
from models import db

app = create_app()

# Réinitialisation de la base de données
with app.app_context():
    db.drop_all()
    db.create_all()
    print("✅ Base de données réinitialisée avec succès.")
