from flask import Blueprint, request, jsonify, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from db import get_db
import uuid  # For generating API keys

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user."""
    db = get_db()
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_password = generate_password_hash(password)
    
    try:
        cursor = db.cursor()
        cursor.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            (username, email, hashed_password)
        )
        db.commit()
        return jsonify({'message': 'User registered successfully'})
    except Exception as e:
        # In a production app, log the error and give a user-friendly message
        return jsonify({'error': 'User registration failed', 'details': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login and API key generation."""
    db = get_db()
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
    user = cursor.fetchone()
    if user and check_password_hash(user['password'], password):
        # Set up session data (or use token-based authentication)
        session['user_id'] = user['id']
        
        # Generate API key for the user if not exists (or regenerate)
        api_key = str(uuid.uuid4())
        cursor.execute('INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)', (user['id'], api_key))
        db.commit()
        
        return jsonify({'message': 'Login successful', 'api_key': api_key})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'})
