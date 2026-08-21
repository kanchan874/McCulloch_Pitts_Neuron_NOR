from flask import Flask, render_template, request, jsonify, send_file
import uuid
import io
from config import Config
from neuron import NORGateNeuron
from utils.truth_table import generate_nor_truth_table
from utils.graph import generate_activation_graph
from utils.helper import generate_csv_report, generate_pdf_report
from database.db_setup import init_db, save_simulation, get_history

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Database
init_db(app.config['DATABASE'])

# Initialize Neuron
nor_neuron = NORGateNeuron()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/simulator')
def simulator():
    return render_template('simulator.html')

@app.route('/theory')
def theory():
    return render_template('theory.html')

@app.route('/visualization')
def visualization():
    # Pass initial values
    details = nor_neuron.get_details(0, 0)
    return render_template('visualization.html', details=details)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/synthesizer')
def synthesizer():
    return render_template('synthesizer.html')

@app.route('/safety-interlock')
def safety_interlock():
    return render_template('safety_interlock.html')

@app.route('/api/simulate', methods=['POST'])
def api_simulate():
    try:
        data = request.get_json()
        x1 = int(data.get('x1', 0))
        x2 = int(data.get('x2', 0))
        
        # Predict
        details = nor_neuron.get_details(x1, x2)
        
        # Save to DB
        sim_id = str(uuid.uuid4())[:8]
        save_simulation(app.config['DATABASE'], sim_id, x1, x2, details['output'])
        
        return jsonify({
            'status': 'success',
            'sim_id': sim_id,
            'details': details
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/api/truth-table')
def api_truth_table():
    tt = generate_nor_truth_table()
    return jsonify(tt)

@app.route('/api/history')
def api_history():
    history = get_history(app.config['DATABASE'])
    return jsonify(history)

@app.route('/report/csv')
def report_csv():
    csv_data = generate_csv_report(app.config['DATABASE'])
    return send_file(
        io.BytesIO(csv_data.encode('utf-8')),
        mimetype='text/csv',
        as_attachment=True,
        download_name='simulation_report.csv'
    )

@app.route('/report/pdf')
def report_pdf():
    pdf_bytes = generate_pdf_report(app.config['DATABASE'])
    return send_file(
        io.BytesIO(pdf_bytes),
        mimetype='application/pdf',
        as_attachment=True,
        download_name='simulation_report.pdf'
    )

if __name__ == '__main__':
    app.run(debug=True, port=5000)
