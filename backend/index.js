const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const trendsRoutes = require('./routes/trendsRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/trends', trendsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => {
  console.log('Backend escuchando en puerto 3000');
});
