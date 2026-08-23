let currentPreset = 'NOR';
let w1 = -1.0;
let w2 = -1.0;
let theta = -0.5;
let inputX1 = 0;
let inputX2 = 0;

const presets = {
    'NAND': { w1: -1.0, w2: -1.0, theta: -1.5 },
    'AND':  { w1: 1.0,  w2: 1.0,  theta: 1.5 },
    'OR':   { w1: 1.0,  w2: 1.0,  theta: 0.5 },
    'NOR':  { w1: -1.0, w2: -1.0, theta: -0.5 }
};

function loadPreset(presetName) {
    currentPreset = presetName;
    const p = presets[presetName];
    w1 = p.w1;
    w2 = p.w2;
    theta = p.theta;
    
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(presetName)) {
            btn.classList.add('active');
        }
    });

    updateUI();
}

function toggleInput(inputId) {
    if (inputId === 1) inputX1 = inputX1 === 1 ? 0 : 1;
    if (inputId === 2) inputX2 = inputX2 === 1 ? 0 : 1;
    updateUI();
}

function updateUI() {
    const z = (w1 * inputX1) + (w2 * inputX2);
    const outputY = z >= theta ? 1 : 0;
    
    // Update Control Panel UI
    document.getElementById('txt-x1').textContent = inputX1;
    document.getElementById('btn-input-x1').style.borderColor = inputX1 ? "var(--accent-secondary)" : "var(--border-subtle)";
    
    document.getElementById('txt-x2').textContent = inputX2;
    document.getElementById('btn-input-x2').style.borderColor = inputX2 ? "var(--accent-primary)" : "var(--border-subtle)";
    
    document.getElementById('disp-w1').textContent = w1.toFixed(1);
    document.getElementById('disp-w2').textContent = w2.toFixed(1);
    document.getElementById('disp-theta').textContent = theta.toFixed(1);

    // Update SVG Elements
    document.getElementById('val-x1').textContent = inputX1;
    document.getElementById('val-x2').textContent = inputX2;
    document.getElementById('val-z').textContent = `z = ${z.toFixed(1)}`;
    document.getElementById('val-theta').textContent = `θ = ${theta.toFixed(1)}`;
    document.getElementById('val-y').textContent = outputY;
    
    document.getElementById('lbl-w1').textContent = `w₁ = ${w1.toFixed(1)}`;
    document.getElementById('lbl-w2').textContent = `w₂ = ${w2.toFixed(1)}`;

    // Glow and color effects
    document.getElementById('node-x1').setAttribute('stroke', inputX1 ? 'var(--accent-secondary)' : 'var(--text-secondary)');
    document.getElementById('node-x2').setAttribute('stroke', inputX2 ? 'var(--accent-primary)' : 'var(--text-secondary)');
    
    const nodeY = document.getElementById('node-y');
    const valY = document.getElementById('val-y');
    if (outputY) {
        nodeY.setAttribute('stroke', 'var(--accent-success)');
        nodeY.setAttribute('fill', 'rgba(34, 197, 94, 0.1)');
        valY.setAttribute('fill', 'var(--accent-success)');
    } else {
        nodeY.setAttribute('stroke', 'var(--accent-danger)');
        nodeY.setAttribute('fill', 'rgba(239, 68, 68, 0.1)');
        valY.setAttribute('fill', 'var(--accent-danger)');
    }
    
    // Update SVG Animated Paths
    document.getElementById('flow-x1').style.opacity = inputX1 ? "1" : "0";
    document.getElementById('flow-x2').style.opacity = inputX2 ? "1" : "0";
    document.getElementById('flow-y').style.opacity = outputY ? "1" : "0";
    document.getElementById('flow-y').setAttribute('stroke', outputY ? 'var(--accent-success)' : 'var(--accent-danger)');
    if (!outputY && (inputX1 || inputX2)) {
        document.getElementById('flow-y').style.opacity = "1"; // Show red line if inputs are active but output fails
    }

    // Step-by-Step Learning Panel
    document.getElementById('step-x1').textContent = inputX1;
    document.getElementById('step-x2').textContent = inputX2;
    
    document.getElementById('step-w1').textContent = w1.toFixed(1);
    document.getElementById('step-x1-2').textContent = inputX1;
    document.getElementById('step-w2').textContent = w2.toFixed(1);
    document.getElementById('step-x2-2').textContent = inputX2;
    document.getElementById('step-z').textContent = z.toFixed(1);
    
    const condElem = document.getElementById('step-cond');
    if (outputY) {
        condElem.innerHTML = `${z.toFixed(1)} ≥ ${theta.toFixed(1)} <span class="text-success">(TRUE) &rarr; y = 1</span>`;
    } else {
        condElem.innerHTML = `${z.toFixed(1)} < ${theta.toFixed(1)} <span class="text-danger">(FALSE) &rarr; y = 0</span>`;
    }

    // Update Title
    const titleElement = document.getElementById('viz-title');
    if (titleElement) {
        titleElement.textContent = `McCulloch-Pitts ${currentPreset} Neuron`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('txt-x1')) {
        updateUI();
    }
});
