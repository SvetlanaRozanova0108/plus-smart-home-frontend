import { useState, useEffect } from 'react';

export function useFetchData(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        if (isActive) {
          setData(result);
        }
      } catch (err) {
        if (isActive) {
          setError(err);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, dependencies);

  return { data, loading, error };
}
