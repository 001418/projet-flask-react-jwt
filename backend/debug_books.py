from app import create_app
from models import db, Book

app = create_app()
with app.app_context():
    books = Book.query.filter_by(title='Dune').all()
    for book in books:
        print(f"{book.title} enregistré par user_id={book.user_id}")
