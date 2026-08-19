import sqlite3
import os

def init_db(db_path: str):
    """Initializes the database and creates the history table if it doesn't exist."""
    # Ensure directory exists
    os.makedirs(os.path.dirname(db_path), exist_ok=True)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            simulation_id TEXT NOT NULL,
            input1 INTEGER NOT NULL,
            input2 INTEGER NOT NULL,
            output INTEGER NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def save_simulation(db_path: str, sim_id: str, x1: int, x2: int, output: int):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO history (simulation_id, input1, input2, output)
        VALUES (?, ?, ?, ?)
    ''', (sim_id, x1, x2, output))
    conn.commit()
    conn.close()

def get_history(db_path: str, limit: int = 10):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT simulation_id, input1, input2, output, timestamp 
        FROM history ORDER BY timestamp DESC LIMIT ?
    ''', (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [{"sim_id": r[0], "x1": r[1], "x2": r[2], "output": r[3], "timestamp": r[4]} for r in rows]
