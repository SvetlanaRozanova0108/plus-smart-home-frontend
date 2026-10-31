import navLinksData from './json/navLinks.json';
import categoriesData from './json/categories.json';
import benefitsData from './json/benefits.json';
import scenariosData from './json/scenarios.json';
import reviewsData from './json/reviews.json';
import categoryLabelsData from './json/categoryLabels.json';
import fallbackProductsData from './json/fallbackProducts.json';
import extraProductsData from './json/extraProducts.json';

export const navLinks = navLinksData.map((item) => ({
  ...item,
}));

export const categories = categoriesData.map((item) => ({
  ...item,
}));

export const benefits = benefitsData.map((item) => ({
  ...item,
}));

export const scenarios = scenariosData.map((item) => ({
  ...item,
}));

export const reviews = reviewsData.map((item) => ({
  ...item,
}));

export const categoryLabels = categoryLabelsData.reduce((acc, item) => {
  acc[item.code] = item.label;
  return acc;
}, {});

export const fallbackProducts = fallbackProductsData.map((item) => ({
  ...item,
}));

export const extraProducts = extraProductsData.map((item) => ({
  ...item,
}));
