import { useState, useEffect } from 'react';
import { fetchAllProducts, getFallbackProducts } from '../api/client';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAllProducts();
        if (isActive) {
          setProducts(result);
        }
      } catch (err) {
        if (isActive) {
          setError(err);
          setProducts(getFallbackProducts());
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isActive = false;
    };
  }, []);

  return { products, loading, error };
}
