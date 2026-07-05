import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, fallbackData) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setData(fallbackData);
        setError("Loaded from local fallback data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, fallbackData]);

  return { data, loading, error };
};

export default useFetch;