const { fetchTrendsFromService } = require('../services/trendsService');

const getTrends = async (req, res, next) => {
  const { keyword } = req.body;
  if (!keyword) return res.status(400).json({ error: 'Falta el campo keyword' });

  try {
    const data = await fetchTrendsFromService(keyword);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getTrends };
