def threshold_activation(net_input: float, threshold: float) -> int:
    """
    Simple threshold activation function for McCulloch-Pitts Neuron.
    Returns 1 if net_input >= threshold, else 0.
    """
    return 1 if net_input >= threshold else 0
