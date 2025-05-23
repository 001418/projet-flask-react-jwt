from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
from sqlalchemy import or_

# Import du modèle Book et de l'instance db (SQLAlchemy)
from models import Book, db

books_bp = Blueprint('books', __name__)

@books_bp.route('/books', methods=['POST'])
@jwt_required()
@cross_origin()
def create_book():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Aucune donnée JSON fournie."}), 400

    # Récupération et validation des champs du livre
    title = data.get('title', "").strip()
    author = data.get('author', "").strip()
    year = data.get('year', None)
    quantity = data.get('quantity', None)
    isbn = data.get('isbn', "").strip()
    genre = data.get('genre', "").strip()

    if not title:
        return jsonify({"message": "Le titre est obligatoire."}), 400
    if not author:
        return jsonify({"message": "L'auteur est obligatoire."}), 400

    if year is None or str(year).strip() == "":
        return jsonify({"message": "L'année est obligatoire."}), 400
    try:
        year = int(year)
    except (ValueError, TypeError):
        return jsonify({"message": "L'année doit être un entier."}), 400
    if year < 0:
        return jsonify({"message": "L'année doit être un entier positif."}), 400

    if quantity is None or str(quantity).strip() == "":
        return jsonify({"message": "La quantité est obligatoire."}), 400
    try:
        quantity = int(quantity)
    except (ValueError, TypeError):
        return jsonify({"message": "La quantité doit être un entier."}), 400
    if quantity < 0:
        return jsonify({"message": "La quantité ne peut pas être négative."}), 400

    if not genre:
        return jsonify({"message": "Le genre est obligatoire."}), 400
    # ISBN peut être facultatif (vide accepté), pas de validation stricte nécessaire

    # Création et enregistrement du nouveau livre
    current_user_id = get_jwt_identity()
    new_book = Book(title=title, author=author, year=year, quantity=quantity,
                    isbn=isbn if isbn else None, genre=genre, user_id=current_user_id)
    try:
        db.session.add(new_book)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        # Si la contrainte d'unicité est violée (par ex: ISBN dupliqué)
        if "UNIQUE constraint" in str(e):
            return jsonify({"message": "ISBN déjà existant."}), 400
        # Erreur générique
        return jsonify({"message": "Une erreur est survenue lors de l'ajout du livre."}), 500

    book_data = {
        "id": new_book.id,
        "title": new_book.title,
        "author": new_book.author,
        "year": new_book.year,
        "quantity": new_book.quantity,
        "isbn": new_book.isbn,
        "genre": new_book.genre
    }
    return jsonify({"message": "Livre ajouté avec succès.", "book": book_data}), 201

@books_bp.route('/books', methods=['GET'])
@jwt_required()
@cross_origin()
def get_books():
    current_user_id = get_jwt_identity()
    books = Book.query.filter_by(user_id=current_user_id).all()
    print("📚 Livres récupérés =", books)  # ← DEBUG
    books_list = []
    for book in books:
        books_list.append({
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "year": book.year,
            "quantity": book.quantity,
            "isbn": book.isbn,
            "genre": book.genre
        })
    return jsonify({"books": books_list}), 200

@books_bp.route('/books/<int:book_id>', methods=['GET'])
@jwt_required()
@cross_origin()
def get_book(book_id):
    current_user_id = get_jwt_identity()
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"message": "Livre introuvable."}), 404
    if book.user_id != current_user_id:
        return jsonify({"message": "Accès interdit."}), 403

    book_data = {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "year": book.year,
        "quantity": book.quantity,
        "isbn": book.isbn,
        "genre": book.genre
    }
    return jsonify({"book": book_data}), 200

@books_bp.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
@cross_origin()
def update_book(book_id):
    current_user_id = get_jwt_identity()
    book = Book.query.get(book_id)
    print("📚 Livres récupérés =", books)  # ← DEBUG CONSOLE
    if not book:
        return jsonify({"message": "Livre introuvable."}), 404
    if book.user_id != current_user_id:
        return jsonify({"message": "Accès interdit."}), 403

    data = request.get_json()
    if not data:
        return jsonify({"message": "Aucune donnée JSON fournie."}), 400

    title = data.get('title', "").strip()
    author = data.get('author', "").strip()
    year = data.get('year', None)
    quantity = data.get('quantity', None)
    isbn = data.get('isbn', "").strip()
    genre = data.get('genre', "").strip()

    if not title:
        return jsonify({"message": "Le titre est obligatoire."}), 400
    if not author:
        return jsonify({"message": "L'auteur est obligatoire."}), 400

    if year is None or str(year).strip() == "":
        return jsonify({"message": "L'année est obligatoire."}), 400
    try:
        year = int(year)
    except (ValueError, TypeError):
        return jsonify({"message": "L'année doit être un entier."}), 400
    if year < 0:
        return jsonify({"message": "L'année doit être un entier positif."}), 400

    if quantity is None or str(quantity).strip() == "":
        return jsonify({"message": "La quantité est obligatoire."}), 400
    try:
        quantity = int(quantity)
    except (ValueError, TypeError):
        return jsonify({"message": "La quantité doit être un entier."}), 400
    if quantity < 0:
        return jsonify({"message": "La quantité ne peut pas être négative."}), 400

    if not genre:
        return jsonify({"message": "Le genre est obligatoire."}), 400
    # ISBN peut être vide (facultatif), aucune validation supplémentaire requise

    # Mise à jour des champs du livre
    book.title = title
    book.author = author
    book.year = year
    book.quantity = quantity
    book.isbn = isbn if isbn else None
    book.genre = genre

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        if "UNIQUE constraint" in str(e):
            return jsonify({"message": "ISBN déjà existant."}), 400
        return jsonify({"message": "Une erreur est survenue lors de la mise à jour."}), 500

    book_data = {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "year": book.year,
        "quantity": book.quantity,
        "isbn": book.isbn,
        "genre": book.genre
    }
    return jsonify({"message": "Livre modifié avec succès.", "book": book_data}), 200

@books_bp.route('/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_book(book_id):
    current_user_id = get_jwt_identity()
    book = Book.query.get(book_id)
    if not book:
        return jsonify({"message": "Livre introuvable."}), 404
    if book.user_id != current_user_id:
        return jsonify({"message": "Accès interdit."}), 403

    try:
        db.session.delete(book)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Une erreur est survenue lors de la suppression."}), 500

    return jsonify({"message": "Livre supprimé avec succès."}), 200

@books_bp.route('/books/search', methods=['GET'])
@jwt_required()
@cross_origin()
def search_books():
    current_user_id = get_jwt_identity()
    query = request.args.get('q', "", type=str)
    # Si aucune requête de recherche n'est fournie, renvoyer tous les livres de l'utilisateur
    if not query:
        books = Book.query.filter_by(user_id=current_user_id).all()
    else:
        search_term = f"%{query.strip()}%"
        books = Book.query.filter(
            Book.user_id == current_user_id,
            or_(Book.title.ilike(search_term), Book.author.ilike(search_term))
        ).all()
    results = []
    for book in books:
        results.append({
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "year": book.year,
            "quantity": book.quantity,
            "isbn": book.isbn,
            "genre": book.genre
        })
    return jsonify({"books": results}), 200
