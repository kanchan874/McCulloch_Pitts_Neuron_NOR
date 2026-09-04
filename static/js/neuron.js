document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the simulator page
    const btnSimulate = document.getElementById('btnSimulate');
    if (!btnSimulate) return;

    const btnReset = document.getElementById('btnReset');
    const btnRandom = document.getElementById('btnRandom');

    function getX1() { return document.getElementById('x1_1').checked ? 1 : 0; }
    function getX2() { return document.getElementById('x2_1').checked ? 1 : 0; }
    function setX1(val) { document.getElementById(val === 1 ? 'x1_1' : 'x1_0').checked = true; }
    function setX2(val) { document.getElementById(val === 1 ? 'x2_1' : 'x2_0').checked = true; }
    const truthTableBody = document.querySelector('#truthTable tbody');

    // Dashboard Elements
    const step1_X1 = document.getElementById('step1_X1');
    const step1_X2 = document.getElementById('step1_X2');
    const step2_Sum = document.getElementById('step2_Sum');
    const valNetInput = document.getElementById('valNetInput');
    const actCheck = document.getElementById('actCheck');
    const decisionText = document.getElementById('decisionText');
    const valOutput = document.getElementById('valOutput');
    const outputCard = document.getElementById('outputCard');

    // Fetch Truth Table on load
    fetchTruthTable();

    btnSimulate.addEventListener('click', runSimulation);
    
    btnReset.addEventListener('click', () => {
        setX1(0);
        setX2(0);
        resetDashboard();
    });

    btnRandom.addEventListener('click', () => {
        setX1(Math.random() >= 0.5 ? 1 : 0);
        setX2(Math.random() >= 0.5 ? 1 : 0);
        runSimulation();
    });

    function runSimulation() {
        const x1 = getX1();
        const x2 = getX2();
        
        fetch('/api/simulate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ x1, x2 })
        })
        .then(res => {
            if (!res.ok) throw new Error("API not available (static mode)");
            return res.json();
        })
        .then(data => {
            if(data.status === 'success') {
                updateDashboard(data.details);
                highlightTruthTable(x1, x2);
            }
        })
        .catch(() => {
            // Client-side local calculation fallback for GitHub Pages
            const w1 = -1, w2 = -1, threshold = -0.5;
            const net_input = (w1 * x1) + (w2 * x2);
            const output = net_input >= threshold ? 1 : 0;
            const details = {
                inputs: [x1, x2],
                weights: [w1, w2],
                net_input: net_input,
                threshold: threshold,
                output: output
            };
            updateDashboard(details);
            highlightTruthTable(x1, x2);
        });
    }

    function updateDashboard(details) {
        const { inputs, weights, net_input, threshold, output } = details;
        
        const w1_val = inputs[0] * weights[0];
        const w2_val = inputs[1] * weights[1];
        
        step1_X1.innerHTML = `X1 (${inputs[0]}) × W1 (${weights[0]}) = <span class="fw-bold text-dark">${w1_val}</span>`;
        step1_X2.innerHTML = `X2 (${inputs[1]}) × W2 (${weights[1]}) = <span class="fw-bold text-dark">${w2_val}</span>`;
        
        step2_Sum.textContent = `${w1_val} + ${w2_val}`;
        valNetInput.textContent = net_input;
        
        actCheck.textContent = `Is ${net_input} >= ${threshold} ?`;
        valOutput.textContent = output;
        
        // Update UI colors based on output
        const badge = valOutput.querySelector('.badge') || valOutput;
        if (output === 1) {
            decisionText.textContent = "Yes! Output is True.";
            decisionText.className = "d-block mb-2 text-uppercase fw-bold text-success small";
            badge.className = 'badge bg-success px-5 py-3 shadow fs-1';
            outputCard.className = 'd-flex align-items-center p-4 rounded border border-success bg-success bg-opacity-10 border-opacity-50';
        } else {
            decisionText.textContent = "No. Output is False.";
            decisionText.className = "d-block mb-2 text-uppercase fw-bold text-danger small";
            badge.className = 'badge bg-danger px-5 py-3 shadow fs-1';
            outputCard.className = 'd-flex align-items-center p-4 rounded border border-danger bg-danger bg-opacity-10 border-opacity-50';
        }
    }

    function resetDashboard() {
        step1_X1.innerHTML = `X1 (0) × W1 (-1) = <span class="fw-bold text-dark">0</span>`;
        step1_X2.innerHTML = `X2 (0) × W2 (-1) = <span class="fw-bold text-dark">0</span>`;
        step2_Sum.textContent = `0 + 0`;
        valNetInput.textContent = '0';
        actCheck.textContent = `Is 0 >= -0.5 ?`;
        valOutput.textContent = '1';
        
        decisionText.textContent = "Yes! Output is True.";
        decisionText.className = "d-block mb-2 text-uppercase fw-bold text-success small";
        valOutput.className = 'badge bg-success px-5 py-3 shadow fs-1';
        outputCard.className = 'd-flex align-items-center p-4 rounded border border-secondary border-opacity-25';
        
        highlightTruthTable(-1, -1);
    }

    function fetchTruthTable() {
        fetch('/api/truth-table')
            .then(res => res.json())
            .then(data => populateTable(data))
            .catch(() => {
                // Client-side fallback data
                const fallbackData = [
                    { x1: 0, x2: 0, expected: 1 },
                    { x1: 0, x2: 1, expected: 0 },
                    { x1: 1, x2: 0, expected: 0 },
                    { x1: 1, x2: 1, expected: 0 }
                ];
                populateTable(fallbackData);
            });
    }

    function populateTable(data) {
        truthTableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.id = `tt-row-${row.x1}-${row.x2}`;
            tr.innerHTML = `
                <td>${row.x1}</td>
                <td>${row.x2}</td>
                <td><span class="badge ${row.expected === 1 ? 'bg-success' : 'bg-danger'}">${row.expected}</span></td>
            `;
            truthTableBody.appendChild(tr);
        });
    }

    function highlightTruthTable(x1, x2) {
        document.querySelectorAll('#truthTable tbody tr').forEach(tr => {
            tr.classList.remove('highlight-row');
        });
        const activeRow = document.getElementById(`tt-row-${x1}-${x2}`);
        if(activeRow) {
            activeRow.classList.add('highlight-row');
        }
    }
});
