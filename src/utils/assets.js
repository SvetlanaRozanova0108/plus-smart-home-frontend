const BASE_URL = import.meta.env.BASE_URL || '/';

function withBase(path) {
  if (!path) return BASE_URL;
  if (/^https?:\/\//.test(path)) return path;
  const cleanBase = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanBase === '') return cleanPath;
  return `${cleanBase}${cleanPath}`;
}

export function icon(name) {
  if (!name) return '';
  return withBase(`/icons/${name}.svg`);
}

export function productImage(imageSrc) {
  if (!imageSrc) return withBase('/images/product-hub.jpg');
  if (/^https?:\/\//.test(imageSrc)) return imageSrc;
  if (imageSrc.startsWith('/images/') || imageSrc.startsWith('/icons/')) {
    return withBase(imageSrc);
  }
  if (imageSrc.startsWith('/')) {
    return withBase(imageSrc);
  }
  const base = imageSrc.split('/').pop().replace(/\.[^.]+$/, '');
  return withBase(`/images/${base}.jpg`);
}

export const images = {
  hero: withBase('/images/hero.jpg'),
  'product-camera': withBase('/images/product-camera.jpg'),
  'product-hub': withBase('/images/product-hub.jpg'),
  'product-lamp': withBase('/images/product-lamp.jpg'),
  'product-sensor': withBase('/images/product-sensor.jpg'),
  'scenario-climate': withBase('/images/scenario-climate.jpg'),
  'scenario-home': withBase('/images/scenario-home.jpg'),
  'scenario-light': withBase('/images/scenario-light.jpg'),
  'scenario-security': withBase('/images/scenario-security.jpg'),
};
