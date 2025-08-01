from pytrends.request import TrendReq
import os
import json
import time
from datetime import datetime, timedelta

CACHE_FILE = "cache.json"
CACHE_EXPIRY_HOURS = 6  # Cache expira después de 6 horas

def get_cached_data(keyword):
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r") as f:
            try:
                cache = json.load(f)
                keyword_data = cache.get(keyword)
                
                if keyword_data:
                    # Verificar si tiene timestamp (para retrocompatibilidad)
                    if isinstance(keyword_data, dict) and 'timestamp' in keyword_data:
                        timestamp = keyword_data['timestamp']
                        cache_time = datetime.fromtimestamp(timestamp)
                        expiry_time = cache_time + timedelta(hours=CACHE_EXPIRY_HOURS)
                        
                        if datetime.now() < expiry_time:
                            print(f"✅ Cache válido para '{keyword}' (expira en {expiry_time.strftime('%H:%M:%S')})")
                            return keyword_data['data']
                        else:
                            print(f"⏰ Cache expirado para '{keyword}' (expiró hace {datetime.now() - expiry_time})")
                            return None
                    else:
                        # Cache antiguo sin timestamp - considerarlo expirado
                        print(f"🔄 Cache sin timestamp para '{keyword}' - requiere actualización")
                        return None
                        
            except json.JSONDecodeError:
                return None
    return None

def save_cache(keyword, data):
    cache = {}
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r") as f:
            try:
                cache = json.load(f)
            except json.JSONDecodeError:
                cache = {}
    
    # Guardar con timestamp actual
    cache[keyword] = {
        'data': data,
        'timestamp': time.time(),
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f, indent=2)
    
    print(f"💾 Cache actualizado para '{keyword}' - válido hasta {(datetime.now() + timedelta(hours=CACHE_EXPIRY_HOURS)).strftime('%Y-%m-%d %H:%M:%S')}")

def get_trends_by_region(keyword):
    cached = get_cached_data(keyword)
    if cached:
        print(f"📋 Usando datos en caché para '{keyword}' (datos actualizados)")
        return cached

    try:
        print(f"🔍 Consultando tendencias NUEVAS para '{keyword}' en Google Trends...")
        
        # Headers personalizados para simular un navegador real
        requests_args = {
            'headers': {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/123.0.0.0 Safari/537.36',
                'Accept-Language': 'es-EC,es;q=0.9,en;q=0.8'
            }
        }
        
        pytrends = TrendReq(hl='es-EC', tz=360, requests_args=requests_args)
        pytrends.build_payload([keyword], geo='EC', timeframe='now 7-d')

        df = pytrends.interest_by_region(resolution='province', inc_low_vol=True)

        print(f"🔍 Debug - Provincias encontradas por Google Trends:")
        print(f"📊 Total de provincias en el DataFrame: {len(df)}")
        print(f"📋 Lista completa de provincias:")
        for idx, provincia in enumerate(df.index):
            print(f"  {idx+1:2d}. {provincia}")
        
        # Verificar específicamente provincias amazónicas
        provincias_amazonicas = ['Orellana', 'Sucumbíos', 'Pastaza', 'Morona Santiago', 'Zamora Chinchipe']
        print(f"\n🌳 Verificando provincias amazónicas:")
        for prov in provincias_amazonicas:
            esta_presente = any(prov.lower() in provincia.lower() for provincia in df.index)
            print(f"  • {prov}: {'✅ SÍ' if esta_presente else '❌ NO'}")

        if keyword in df.columns:
            print(f"Consulta exitosa para '{keyword}'")
            result = df[keyword].dropna().astype(int).to_dict()
            
            # Debug de los valores obtenidos
            print(f"\n📈 Valores obtenidos para '{keyword}':")
            for provincia, valor in sorted(result.items(), key=lambda x: x[1], reverse=True):
                print(f"  • {provincia}: {valor}")
            
            save_cache(keyword, result)
            return result
        else:
            print("No se encontró la columna del keyword.")
            return {}

    except Exception as e:
        print(f"Error al consultar tendencias: {e}")
        raise Exception(f"No se pudo obtener datos de tendencias para '{keyword}': {e}")
