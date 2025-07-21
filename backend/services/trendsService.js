const axios = require('axios');

const fetchTrendsFromService = async (keyword) => {
  // Detectar automáticamente si estamos en Docker o local
  const trendsUrl = process.env.DOCKER_URL || 'http://localhost:5001/trends';
  
  console.log(`Consultando trends service en: ${trendsUrl}`);
  
  const response = await axios.post(trendsUrl, { keyword });
  return response.data;
};

module.exports = { fetchTrendsFromService };
