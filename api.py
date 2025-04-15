# api.py
from flask import Blueprint, request, jsonify, g
from db import get_db
import requests
from functools import wraps

api_bp = Blueprint('api', __name__)

def require_api_key(f):
    """Decorator to enforce API key-based authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if not api_key:
            return jsonify({'error': 'API key required'}), 401
        
        # Validate the API key against the database
        cursor = get_db().cursor()
        cursor.execute('SELECT * FROM api_keys WHERE api_key = ?', (api_key,))
        key = cursor.fetchone()
        if not key:
            return jsonify({'error': 'Invalid API key'}), 403
        
        # Log API request for tracking purposes
        cursor.execute(
            'INSERT INTO api_requests (api_key, endpoint) VALUES (?, ?)',
            (api_key, request.path)
        )
        get_db().commit()
        return f(*args, **kwargs)
    return decorated

@api_bp.route('/api/country/<country_name>', methods=['GET'])
@require_api_key
def get_country(country_name):
    """Endpoint to get filtered country data from restcountries.com."""
    try:
        # Call RestCountries API
        response = requests.get(f"https://restcountries.com/v3.1/name/{country_name}")
        if response.status_code != 200:
            return jsonify({'error': 'Country not found or API error'}), response.status_code

        # Process and filter the response JSON
        countries = response.json()  # This returns a list of countries data
        # For our purposes, we take the first match (or refine the logic as needed)
        country = countries[0] if countries else {}
        filtered = {
            "name": country.get("name", {}).get("common", "N/A"),
            "currencies": country.get("currencies", {}),
            "capital": country.get("capital", ["N/A"])[0] if country.get("capital") else "N/A",
            "languages": country.get("languages", {}),
            "flag": country.get("flags", {}).get("png", "")  # or "svg"
        }
        return jsonify(filtered)
    except Exception as e:
        return jsonify({'error': 'An error occurred', 'details': str(e)}), 500
