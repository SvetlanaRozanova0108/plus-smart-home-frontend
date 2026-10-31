import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAllProducts, getFallbackProducts } from '../../api/client';
import CatalogList from '../presentational/CatalogList';

export default function CatalogContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  const search = searchParams.get('q') || '';
  const sort = searchParams.get('sort') || 'popular';

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

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  };

  return (
    <CatalogList
      products={products}
      loading={loading}
      error={error}
      category={category}
      search={search}
      sort={sort}
      setParam={setParam}
    />
  );
}
