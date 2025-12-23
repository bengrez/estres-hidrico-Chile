from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json().get('status') == 'ok'


def test_meta():
    response = client.get('/meta')
    assert response.status_code == 200
    payload = response.json()
    assert 'years' in payload and isinstance(payload['years'], list)
    assert 'indices' in payload and len(payload['indices']) >= 1
