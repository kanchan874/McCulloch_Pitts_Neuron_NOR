# McCulloch-Pitts Neuron Simulator for NOR Gate

## Project Overview
This project is an interactive educational Deep Learning application that demonstrates the working of a McCulloch-Pitts Neuron implementing a NOR Logic Gate. It is designed to help students understand Artificial Neurons, Threshold Logic, Binary Inputs/Outputs, and Deep Learning Fundamentals through interactive visualization.

## Features
- **Interactive Simulator**: Toggle inputs and observe real-time calculation of weighted sum, threshold, and activation.
- **Truth Table Generator**: Automatically generates and highlights truth tables for NOR logic gate operations.
- **Animated Data Flow**: Visualize signal propagation through the artificial neuron with beautiful SVG animations.
- **Report Generation**: Export simulation history to CSV and PDF formats.
- **Professional Educational UI**: Built with Bootstrap 5, featuring a clean layout, responsive design, and informative cards.

## Folder Structure
```text
McCulloch_Pitts_NOR/
├── app.py                  # Main Flask application
├── requirements.txt        # Python dependencies
├── config.py               # Configuration variables
├── README.md               # Project documentation
├── neuron.py               # Facade for the MCP neuron model
├── models/
│   └── mcp_neuron.py       # McCulloch-Pitts logic
├── static/                 # CSS, JS, Images, Icons
│   ├── css/
│   │   ├── style.css
│   │   └── dashboard.css
│   └── js/
│       ├── neuron.js       # Simulator interaction logic
│       └── animation.js    # SVG animation logic
├── templates/              # HTML Templates
│   ├── base.html
│   ├── index.html
│   ├── simulator.html
│   ├── theory.html
│   ├── visualization.html
│   └── about.html
├── utils/                  # Helper functions
│   ├── truth_table.py
│   ├── activation.py
│   ├── graph.py
│   └── helper.py           # Report generation
├── database/               # Database setup and logic
│   ├── db_setup.py
│   └── neuron.db           # SQLite DB (generated at runtime)
└── docs/                   # Documentation and screenshots
```

## Theory: McCulloch-Pitts Neuron
Proposed by Warren McCulloch and Walter Pitts in 1943, the MCP neuron operates on binary inputs (0 or 1) and produces a binary output based on Threshold Logic. 
For a NOR gate (which outputs 1 only when both inputs are 0), the neuron uses negative weights (`w1 = -1, w2 = -1`) and a threshold (`θ = -0.5`). 

## Installation & Requirements

### Prerequisites
- Python 3.12+
- VS Code (Recommended)
- Git

### How to Run Locally

1. **Clone the Repository** (or download the project folder):
   ```bash
   git clone <repo_url>
   cd McCulloch_Pitts_Neuron_NOR
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

5. **Access the App**:
   Open your browser and navigate to `http://127.0.0.1:5000/`.

## Future Scope
- Implement AND, OR, NAND, XOR Gates
- Perceptron Learning Algorithm
- Multi-Layer Perceptron (MLP) Visualizer
- TensorFlow & PyTorch Integrations

## Author
Senior Deep Learning Engineer & Software Architect
