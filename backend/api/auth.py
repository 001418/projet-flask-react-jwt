from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User
import re

auth_bp = Blueprint("auth", __name__)

def is_valid_email(email):
    return re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", email)


def is_valid_password(password):
    return len(password) >= 6

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"error": "Email et mot de passe requis"}), 400
    if not is_valid_email(email):
        return jsonify({"error": "Email invalide"}), 400
    if not is_valid_password(password):
        return jsonify({"error": "Mot de passe trop court (6 caractères min)"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Utilisateur déjà existant"}), 409

    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Utilisateur créé"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(identity=str(user.id))
        return jsonify({"token": token}), 200
    
    print("❌ Echec de login:", email)
    return jsonify({"error": "Identifiants invalides"}), 401