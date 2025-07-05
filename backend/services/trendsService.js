const axios = require('axios');

const fetchTrendsFromService = async (keyword) => {
  const response = await axios.post('http://localhost:5001/trends', { keyword });
  return response.data;
};

module.exports = { fetchTrendsFromService };
