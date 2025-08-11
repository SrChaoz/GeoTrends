from flask import Flask, request, jsonify
from flask_cors import CORS
from trends.fetch import get_trends_by_region
import os

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'service': 'GeoTrends Service',
        'timestamp': __import__('datetime').datetime.now().isoformat()
    }), 200

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
        print(f"❌ Error al consultar pytrends: {error_message}")

        # Si Google bloqueó (429), informar claramente
        if "429" in error_message or "Too Many Requests" in error_message or "bloqueado temporalmente" in error_message:
            return jsonify({
                'error': 'Google Trends ha bloqueado temporalmente las consultas',
                'mensaje': 'Hemos realizado demasiadas consultas. Por favor, espera 15-30 minutos antes de intentar nuevamente.',
                'codigo': 429,
                'recomendacion': 'Usa términos de búsqueda que ya están en caché o espera un tiempo antes de buscar nuevos términos.'
            }), 429

        # Error de conexión
        elif "conexión" in error_message.lower() or "connection" in error_message.lower():
            return jsonify({
                'error': 'Error de conexión',
                'mensaje': 'No se pudo conectar con Google Trends. Revisa tu conexión a internet.',
                'codigo': 503
            }), 503

        # Error genérico
        return jsonify({
            'error': 'Error al consultar Google Trends', 
            'detalles': error_message,
            'codigo': 500
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug_mode = os.environ.get('FLASK_ENV') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
