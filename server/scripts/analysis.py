import sys
import json

def analyze(data):
    # Perform your data analysis here
    # For example, calculate the sum of a column
    result = sum(item['value'] for item in data if 'value' in item)
    print("PYTHON")
    return {'sum': result}

if __name__ == '__main__':
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    result = analyze(data)
    print(json.dumps(result))