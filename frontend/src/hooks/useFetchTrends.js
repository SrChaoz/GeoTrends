import { useState, useCallback } from 'react';
import { fetchTrends as apiFetchTrends } from '../services/apiService';

const useFetchTrends = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTrends = useCallback(async (keyword) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiFetchTrends(keyword);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    fetchTrends,
    reset
  };
};

export default useFetchTrends;
