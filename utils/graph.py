import matplotlib.pyplot as plt
import io
import base64

def generate_activation_graph(net_inputs: list[float], threshold: float) -> str:
    """
    Generates a static activation graph and returns it as a base64 string.
    """
    plt.figure(figsize=(6, 4))
    
    # Plotting line points
    outputs = [1 if n >= threshold else 0 for n in net_inputs]
    plt.step(net_inputs, outputs, where='post', color='b', linewidth=2)
    
    # Highlighting threshold
    plt.axvline(x=threshold, color='r', linestyle='--', label=f'Threshold ({threshold})')
    
    plt.title('Threshold Activation Function')
    plt.xlabel('Net Input')
    plt.ylabel('Output')
    plt.legend()
    plt.grid(True)
    
    # Save to memory buffer
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    plt.close()
    
    return image_base64
