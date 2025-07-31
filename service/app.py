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
        
        # Debug: mostrar qué se envía al frontend
        print(f"\n📤 Enviando al frontend para '{keyword}':")
        print(f"📊 Total de provincias con datos: {len(result)}")
        
        # Verificar provincias amazónicas en el resultado final
        provincias_amazonicas = ['orellana', 'sucumbios', 'sucumbíos', 'pastaza', 'morona', 'zamora']
        amazonicas_con_datos = []
        for provincia, valor in result.items():
            if any(amaz in provincia.lower() for amaz in provincias_amazonicas):
                amazonicas_con_datos.append(f"{provincia}: {valor}")
        
        if amazonicas_con_datos:
            print(f"🌳 Provincias amazónicas en resultado final:")
            for item in amazonicas_con_datos:
                print(f"  • {item}")
        else:
            print(f"⚠️  NO hay provincias amazónicas en el resultado final")
            
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
