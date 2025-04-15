# app.py
from flask import Flask
from db import get_db, close_connection
from models import init_db
from auth import auth_bp
from api import api_bp
from admin import admin_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes
app.secret_key = "20211454"  # a secure key in production

# Register Blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(api_bp)
app.register_blueprint(admin_bp)

# Database teardown
@app.teardown_appcontext
def teardown_db(exception):
    close_connection(exception)

# Root route to verify the server is running
@app.route('/')
def index():
    return "Welcome to the Secure API Middleware Service!"

if __name__ == '__main__':
    with app.app_context():
        # Initialize the database tables if they don't exist
        init_db()
    app.run(debug=True, host='0.0.0.0', port=5001)

@app.route('/test-db')
def test_db_connection():
    try:
        db = get_db()
        cursor = db.cursor()
        # Run a simple query to test
        cursor.execute('SELECT name FROM sqlite_master WHERE type="table";')
        tables = cursor.fetchall()
        return {
            "status": "success",
            "message": "Database connected successfully!",
            "tables": [table['name'] for table in tables]
        }, 200
    except Exception as e:
        return {
            "status": "error",
            "message": "Database connection failed.",
            "details": str(e)
        }, 500
