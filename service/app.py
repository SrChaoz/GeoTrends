from flask import Flask, request, jsonify
from flask_cors import CORS
from trends.fetch import get_trends_by_region

app = Flask(__name__)
CORS(app)

@app.route('/trends', methods=['POST'])
def trends():
    data = request.get_json()
    keyword = data.get('keyword')

    if not keyword:
        return jsonify({'error': 'Falta el campo keyword'}), 400

    try:
        result = get_trends_by_region(keyword)
        return jsonify(result)
    except Exception as e:
        error_message = str(e)

        # Log en consola
        print("Error al consultar pytrends:", error_message)

        # Si Google bloqueó (429), lo informamos claramente
        if "429" in error_message or "Too Many Requests" in error_message:
            return jsonify({'error': 'Google Trends bloqueó la solicitud (código 429). Intenta con un proxy diferente o más tarde.'}), 429

        return jsonify({'error': 'Error al consultar pytrends', 'detalles': error_message}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
