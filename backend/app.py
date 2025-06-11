from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from models import db
from api.auth import auth_bp
from api.books import books_bp

jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Enregistrement des blueprints
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(books_bp, url_prefix="/api")
    
    # Endpoint de test simple
    @app.route("/")
    def index():
        return jsonify({"message": "✅ API Flask opérationnelle"}), 200

    return app

# Lancement direct
if __name__ == "__main__":
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)
