// Synthesizer Logic

function updateSynth() {
    // Get values
    const w11 = parseFloat(document.getElementById('w11').value) || 0;
    const w21 = parseFloat(document.getElementById('w21').value) || 0;
    const th1 = parseFloat(document.getElementById('th1').value) || 0;

    const w12 = parseFloat(document.getElementById('w12').value) || 0;
    const w22 = parseFloat(document.getElementById('w22').value) || 0;
    const th2 = parseFloat(document.getElementById('th2').value) || 0;

    const wy1 = parseFloat(document.getElementById('wy1').value) || 0;
    const wy2 = parseFloat(document.getElementById('wy2').value) || 0;
    const thy = parseFloat(document.getElementById('thy').value) || 0;

    // Update SVG labels
    document.getElementById('svg-w11').textContent = w11;
    // Note: svg-w22 is placed visually between x2 and H2
    document.getElementById('svg-w22').textContent = w22;
    document.getElementById('svg-wy1').textContent = wy1;
    document.getElementById('svg-wy2').textContent = wy2;

    document.getElementById('svg-th1').textContent = `θ = ${th1}`;
    document.getElementById('svg-th2').textContent = `θ = ${th2}`;
    document.getElementById('svg-ty').textContent = `θ = ${thy}`;

    // Generate Truth Table
    const tbody = document.getElementById('synth-table-body');
    tbody.innerHTML = ''; // clear

    const inputs = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1]
    ];

    inputs.forEach(val => {
        const x1 = val[0];
        const x2 = val[1];

        // Calc H1
        const z1 = (x1 * w11) + (x2 * w21);
        const h1 = z1 >= th1 ? 1 : 0;

        // Calc H2
        const z2 = (x1 * w12) + (x2 * w22);
        const h2 = z2 >= th2 ? 1 : 0;

        // Calc Y
        const zy = (h1 * wy1) + (h2 * wy2);
        const y = zy >= thy ? 1 : 0;

        // Append row
        const tr = document.createElement('tr');
        if (y === 1) {
            tr.style.background = 'rgba(34, 197, 94, 0.05)';
        }
        tr.innerHTML = `
            <td class="text-white">${x1}</td>
            <td class="text-white">${x2}</td>
            <td class="text-info">${h1}</td>
            <td class="text-info">${h2}</td>
            <td class="fw-bold ${y === 1 ? 'text-success' : 'text-danger'} fs-5">${y}</td>
        `;
        tbody.appendChild(tr);
    });
}

function loadSynthPreset(gate) {
    if (gate === 'XOR') {
        // Example XOR using threshold logic:
        // H1 = x1 AND NOT x2 (w1=1, w2=-1, th=1)
        // H2 = NOT x1 AND x2 (w1=-1, w2=1, th=1)
        // Y = H1 OR H2 (w1=1, w2=1, th=1)
        document.getElementById('w11').value = 1;
        document.getElementById('w21').value = -1;
        document.getElementById('th1').value = 1;

        document.getElementById('w12').value = -1;
        document.getElementById('w22').value = 1;
        document.getElementById('th2').value = 1;

        document.getElementById('wy1').value = 1;
        document.getElementById('wy2').value = 1;
        document.getElementById('thy').value = 1;
    } else if (gate === 'XNOR') {
        // Example XNOR
        // H1 = x1 AND x2 (w1=1, w2=1, th=2)
        // H2 = NOT x1 AND NOT x2 (w1=-1, w2=-1, th=0)
        // Y = H1 OR H2 (w1=1, w2=1, th=1)
        document.getElementById('w11').value = 1;
        document.getElementById('w21').value = 1;
        document.getElementById('th1').value = 2;

        document.getElementById('w12').value = -1;
        document.getElementById('w22').value = -1;
        document.getElementById('th2').value = 0;

        document.getElementById('wy1').value = 1;
        document.getElementById('wy2').value = 1;
        document.getElementById('thy').value = 1;
    }
    updateSynth();
}

// Bind inputs
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.param-input').forEach(input => {
        input.addEventListener('input', updateSynth);
    });
    updateSynth();
});
