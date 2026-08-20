import csv
import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
import sqlite3

def generate_csv_report(db_path: str) -> str:
    """
    Fetch history from DB and generate CSV data as a string.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT simulation_id, input1, input2, output, timestamp FROM history ORDER BY timestamp DESC")
    rows = cursor.fetchall()
    conn.close()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Simulation ID', 'Input 1', 'Input 2', 'Output', 'Timestamp'])
    for row in rows:
        writer.writerow(row)
        
    return output.getvalue()

def generate_pdf_report(db_path: str) -> bytes:
    """
    Fetch history from DB and generate PDF as bytes.
    """
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT simulation_id, input1, input2, output, timestamp FROM history ORDER BY timestamp DESC LIMIT 20")
    rows = cursor.fetchall()
    conn.close()

    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.drawString(100, 750, "McCulloch-Pitts NOR Simulator - Report")
    
    y = 720
    c.drawString(100, y, "ID | X1 | X2 | Output | Timestamp")
    y -= 20
    for row in rows:
        c.drawString(100, y, f"{row[0]} | {row[1]} | {row[2]} | {row[3]} | {row[4]}")
        y -= 20
        if y < 50:
            c.showPage()
            y = 750

    c.save()
    buffer.seek(0)
    return buffer.getvalue()
