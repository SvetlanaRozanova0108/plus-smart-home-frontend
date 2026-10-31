import { useMemo, useState } from 'react';
import ProductCard from '../ProductCard';
import { categoryLabels } from '../../data/catalogLoader';
import { itemsLabel } from '../../utils/format';
import PageHead from '../PageHead';
import UiIcon from '../UiIcon';
import { motion } from 'framer-motion';

const SORTS = [
  { value: 'popular', label: 'Сначала популярные' },
  { value: 'new', label: 'Сначала новинки' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'rating', label: 'По рейтингу' },
];

const PAGE_SIZE = 12;

export default function CatalogList({ products, loading, error, category, search, sort, setParam }) {
  const [query, setQuery] = useState(search);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    const result = products.filter((product) => {
      if (category && product.productCategory !== category) return false;
      if (!normalizedQuery) return true;
      return `${product.productName} ${product.description}`
        .toLowerCase()
        .includes(normalizedQuery);
    });

    const sorted = [...result];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
        break;
      case 'new':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.reviewCount - a.reviewCount);
        break;
      default:
        sorted.sort((a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating);
    }
    return sorted;
  }, [products, category, search, sort]);

  const shown = filtered.slice(0, visible);

  const resetFilters = () => {
    setQuery('');
    setParam('q', '');
    setParam('category', '');
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Загрузка каталога...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <h2>Ошибка загрузки</h2>
        <p>Не удалось загрузить товары. Показаны сохранённые данные.</p>
      </div>
    );
  }

  return (
    <>
      <PageHead
        eyebrow="Магазин Plus"
        title="Каталог устройств"
        text="Умные лампы, датчики, контроллеры и аксессуары. Всё совместимо между собой и работает в приложении Plus."
        breadcrumbs={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]}
      />

      <section className="section catalog">
        <div className="container">
          <div className="catalog__toolbar">
            <form
              className="catalog-search"
              onSubmit={(event) => {
                event.preventDefault();
                setParam('q', query.trim());
              }}
            >
              <UiIcon name="search" size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Найти лампу, датчик или контроллер"
                aria-label="Поиск по каталогу"
              />
              {query && (
                <button
                  type="button"
                  className="catalog-search__clear"
                  onClick={() => {
                    setQuery('');
                    setParam('q', '');
                  }}
                  aria-label="Очистить поиск"
                >
                  <UiIcon name="close" size={15} />
                </button>
              )}
              <button type="submit" className="btn btn--primary btn--sm">
                Найти
              </button>
            </form>

            <label className="select">
              <UiIcon name="filter" size={17} />
              <span className="sr-only">Сортировка</span>
              <select value={sort} onChange={(event) => setParam('sort', event.target.value)}>
                {SORTS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <UiIcon name="chevronDown" size={15} />
            </label>
          </div>

          <div className="catalog__filters">
            <button
              type="button"
              className={`filter-chip ${!category ? 'is-active' : ''}`}
              onClick={() => setParam('category', '')}
            >
              Все устройства
            </button>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`filter-chip ${category === value ? 'is-active' : ''}`}
                onClick={() => setParam('category', value)}
              >
                {label}
              </button>
            ))}

            {search && (
              <button type="button" className="filter-chip filter-chip--query" onClick={() => setParam('q', '')}>
                «{search}»
                <UiIcon name="close" size={13} />
              </button>
            )}
          </div>

          <div className="catalog__meta">
            <span>{itemsLabel(filtered.length)}</span>
            <span className="catalog__hint">
              <UiIcon name="truck" size={16} /> Бесплатная доставка от 5 000 ₽
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__icon">
                <UiIcon name="search" size={26} />
              </span>
              <h2>Ничего не найдено</h2>
              <p>Попробуйте изменить запрос или выбрать другую категорию.</p>
              <button type="button" className="btn btn--primary btn--sm" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <>
              <motion.div
                className="product-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {shown.map((product, index) => (
                  <motion.div
                    key={product.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>

              {visible < filtered.length && (
                <div className="catalog__more">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setVisible((value) => value + PAGE_SIZE)}
                  >
                    Показать ещё {Math.min(PAGE_SIZE, filtered.length - visible)}
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => setVisible(filtered.length)}
                  >
                    Показать все
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
