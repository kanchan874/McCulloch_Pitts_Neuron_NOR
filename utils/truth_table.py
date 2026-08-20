def generate_nor_truth_table() -> list[dict]:
    """
    Generates the truth table for a 2-input NOR gate.
    Returns a list of dictionaries.
    """
    inputs = [(0, 0), (0, 1), (1, 0), (1, 1)]
    truth_table = []
    
    for x1, x2 in inputs:
        # NOR logic: NOT (X1 OR X2)
        expected_output = 1 if (x1 == 0 and x2 == 0) else 0
        truth_table.append({
            'x1': x1,
            'x2': x2,
            'expected': expected_output
        })
        
    return truth_table
