module.exports = (err, req, res, next) => {
  console.error('Error capturado:', err.message);
  res.status(500).json({ error: 'Error interno del servidor' });
};
