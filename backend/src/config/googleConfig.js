import dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const GOOGLE_PLACES_BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json';
export const GOOGLE_GEOCODE_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
export const GOOGLE_DISTANCE_MATRIX_BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json';
export const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api/js';
export const GOOGLE_MAPS_LIBRARIES = 'places,geometry,visualization';
export const GOOGLE_MAPS_VERSION = 'weekly'; // Puedes cambiar a una versión específica si es necesario
export const GOOGLE_MAPS_LANGUAGE = 'es'; // Cambia el idioma según tus necesidades
export const GOOGLE_MAPS_REGION = 'ES'; // Cambia la región según tus necesidades
export const GOOGLE_MAPS_CLIENT_ID = process.env.GOOGLE_MAPS_CLIENT_ID; // Si usas autenticación OAuth2
export const GOOGLE_MAPS_CLIENT_SECRET = process.env.GOOGLE_MAPS_CLIENT_SECRET; // Si usas autenticación OAuth2
export const GOOGLE_MAPS_API_URL = `${GOOGLE_MAPS_BASE_URL}?key=${GOOGLE_API_KEY}&libraries=${GOOGLE_MAPS_LIBRARIES}&v=${GOOGLE_MAPS_VERSION}&language=${GOOGLE_MAPS_LANGUAGE}&region=${GOOGLE_MAPS_REGION}`;
// Asegúrate de que las variables de entorno estén configuradas correctamente en tu archivo .env
// para que la API funcione correctamente.
// Puedes agregar más configuraciones según tus necesidades específicas de la API de Google Maps.
// Este archivo contiene la configuración de la API de Google Maps y sus servicios relacionados.
// Asegúrate de que las variables de entorno estén configuradas correctamente en tu archivo .env
// para que la API funcione correctamente.
// Puedes agregar más configuraciones según tus necesidades específicas de la API de Google Maps.
// Este archivo contiene la configuración de la API de Google Maps y sus servicios relacionados.
// Asegúrate de que las variables de entorno estén configuradas correctamente en tu archivo .env
// para que la API funcione correctamente.
// Puedes agregar más configuraciones según tus necesidades específicas de la API de Google Maps.       

