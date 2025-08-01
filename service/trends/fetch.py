from pytrends.request import TrendReq
import os
import json
import time
import random
from datetime import datetime, timedelta

CACHE_FILE = "cache.json"
CACHE_EXPIRY_HOURS = 12  # Aumentado a 12 horas para reducir consultas a Google

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
        
        # Headers avanzados para evitar detección como bot
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:124.0) Gecko/20100101 Firefox/124.0'
        ]
        
        # Seleccionar user agent aleatorio
        selected_ua = random.choice(user_agents)
        
        requests_args = {
            'headers': {
                'User-Agent': selected_ua,
                'Accept-Language': 'es-EC,es-419;q=0.9,es;q=0.8,en;q=0.7',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Sec-Ch-Ua': '"Chromium";v="123", "Not:A-Brand";v="8"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"Windows"',
                'Cache-Control': 'max-age=0'
            },
            'verify': True
        }
        
        # Configuración simplificada de pytrends (timeout separado)
        pytrends = TrendReq(
            hl='es-EC', 
            tz=360, 
            timeout=(10, 30),  # (connect_timeout, read_timeout)
            requests_args=requests_args
        )
        
        # Pequeño delay solo al inicializar (no impacta UX significativamente)
        time.sleep(random.uniform(1, 3))
        
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
        error_msg = str(e)
        print(f"❌ Error al consultar tendencias: {error_msg}")
        
        # Detectar si es error 429 y proporcionar mensaje específico
        if "429" in error_msg or "Too Many Requests" in error_msg:
            print(f"🚫 Google Trends bloqueó la consulta (código 429)")
            print(f"💡 Recomendación: Esperar 15-30 minutos antes de hacer nuevas consultas")
            raise Exception(f"Google Trends ha bloqueado temporalmente las consultas. Intenta más tarde.")
        
        # Otros errores de conexión
        elif "timeout" in error_msg.lower() or "connection" in error_msg.lower():
            print(f"🌐 Error de conexión con Google Trends")
            raise Exception(f"Error de conexión con Google Trends. Revisa tu conexión a internet.")
        
        # Error genérico
        else:
            raise Exception(f"No se pudo obtener datos de tendencias para '{keyword}': {error_msg}")
