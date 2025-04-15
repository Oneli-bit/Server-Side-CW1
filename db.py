import os
import sqlite3
from flask import g

DATABASE = 'database.db'

def get_db():
    # Opens a new database connection if there is none yet for the current application context.
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    db.row_factory = sqlite3.Row  # to return dictionaries
    return db

def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()
