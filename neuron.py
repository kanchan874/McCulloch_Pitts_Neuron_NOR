from models.mcp_neuron import MCPNeuron

# For a NOR gate, we can use weights [-1, -1] and a threshold of 0.
# Let's verify:
# x1=0, x2=0 -> net = 0 >= 0 -> 1
# x1=0, x2=1 -> net = -1 < 0 -> 0
# x1=1, x2=0 -> net = -1 < 0 -> 0
# x1=1, x2=1 -> net = -2 < 0 -> 0

# Alternative (often taught):
# weights = [-1, -1], threshold = -0.5
# 0,0 -> 0 >= -0.5 (1)
# 0,1 -> -1 >= -0.5 (0)
# 1,0 -> -1 >= -0.5 (0)
# 1,1 -> -2 >= -0.5 (0)

NOR_WEIGHTS = [-1, -1]
NOR_THRESHOLD = -0.5

class NORGateNeuron:
    """Facade for the MCP Neuron configured as a NOR gate."""
    
    def __init__(self):
        self.neuron = MCPNeuron(weights=NOR_WEIGHTS, threshold=NOR_THRESHOLD)

    def predict(self, x1: int, x2: int) -> int:
        return self.neuron.predict([x1, x2])

    def get_details(self, x1: int, x2: int) -> dict:
        return self.neuron.get_details([x1, x2])
