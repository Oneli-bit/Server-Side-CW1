from flask import Blueprint, session, jsonify, get_flashed_messages, g
from db import get_db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/api-keys', methods=['GET'])
def list_api_keys():
    """List all API keys for the logged-in user."""
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Authentication required'}), 401
    cursor = get_db().cursor()
    cursor.execute('SELECT api_key FROM api_keys WHERE user_id = ?', (user_id,))
    api_keys = [row['api_key'] for row in cursor.fetchall()]
    return jsonify({'api_keys': api_keys})
