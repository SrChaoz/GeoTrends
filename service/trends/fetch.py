from pytrends.request import TrendReq
import os
import json

CACHE_FILE = "cache.json"

def get_cached_data(keyword):
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, "r") as f:
            try:
                cache = json.load(f)
                return cache.get(keyword)
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
    cache[keyword] = data
    with open(CACHE_FILE, "w") as f:
        json.dump(cache, f)

def get_trends_by_region(keyword):
    cached = get_cached_data(keyword)
    if cached:
        print(f"Usando datos en caché para '{keyword}'")
        return cached

    try:
        print(f"Consultando tendencias para '{keyword}'")
        
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
