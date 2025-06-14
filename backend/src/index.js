import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './src/routes/searchRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/search', searchRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error al Iniciar el Backend');
});
