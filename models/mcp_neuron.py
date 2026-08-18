class MCPNeuron:
    """
    McCulloch-Pitts Neuron Model for logic gates.
    """
    def __init__(self, weights: list[float], threshold: float):
        self.weights = weights
        self.threshold = threshold

    def _net_input(self, inputs: list[int]) -> float:
        """Calculate the weighted sum."""
        return sum(w * x for w, x in zip(self.weights, inputs))

    def predict(self, inputs: list[int]) -> int:
        """Predict the output based on inputs and threshold."""
        net = self._net_input(inputs)
        return 1 if net >= self.threshold else 0

    def get_details(self, inputs: list[int]) -> dict:
        """Returns detailed calculation for visualization."""
        net = self._net_input(inputs)
        activation = 1 if net >= self.threshold else 0
        return {
            'inputs': inputs,
            'weights': self.weights,
            'net_input': net,
            'threshold': self.threshold,
            'output': activation
        }
