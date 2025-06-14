import express from 'express';
import { searchPlaces } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchPlaces);  // ejemplo: /api/search?q=papas+fritas

export default router;
// Este archivo define las rutas para las búsquedas de lugares.
// Utiliza el controlador searchController.js para manejar las solicitudes GET a la ruta /api/search.
// La ruta espera un parámetro de consulta 'q' que contiene el término de búsqueda.
// Por ejemplo, una solicitud a /api/search?q=papas+fritas buscará lugares relacionados con "papas fritas".
// Asegúrate de que el controlador searchController.js esté implementado correctamente para manejar la lógica de búsqueda.
// Este archivo es parte de la estructura del backend y se utiliza para definir las rutas relacionadas con las búsquedas de lugares.
// Asegúrate de que el controlador searchController.js esté implementado correctamente para manejar la lógica de búsqueda.  
// Este archivo es parte de la estructura del backend y se utiliza para definir las rutas relacionadas con las búsquedas de lugares.
// Asegúrate de que el controlador searchController.js esté implementado correctamente para manejar la lógica de búsqueda.
// Este archivo es parte de la estructura del backend y se utiliza para definir las rutas relacionadas con las búsquedas de lugares.
// Asegúrate de que el controlador searchController.js esté implementado correctamente para manejar la lógica de búsqueda.
// Este archivo es parte de la estructura del backend y se utiliza para definir las rutas relacionadas con las búsquedas de lugares.
// Asegúrate de que el controlador searchController.js esté implementado correctamente para manejar la lógica de búsqueda.