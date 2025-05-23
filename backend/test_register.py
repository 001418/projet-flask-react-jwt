# 📁 backend/tests/test_register.py

import json
from app import create_app
from models import db
import pytest

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
    with app.test_client() as client:
        yield client


def test_register_success(client):
    response = client.post(
        '/api/register',
        data=json.dumps({"email": "demo@test.com", "password": "123456"}),
        content_type='application/json'
    )
    assert response.status_code == 201
    assert b"Utilisateur cr\xc3\xa9\xc3\xa9" in response.data
