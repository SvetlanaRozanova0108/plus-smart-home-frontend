export function icon(name) {
  if (!name) return '';
  return `/icons/${name}.svg`;
}

export function productImage(imageSrc) {
  if (!imageSrc) return '/images/product-hub.jpg';
  if (/^https?:\/\//.test(imageSrc)) return imageSrc;
  if (imageSrc.startsWith('/images/') || imageSrc.startsWith('/icons/')) return imageSrc;
  if (imageSrc.startsWith('/')) return imageSrc;
  const base = imageSrc.split('/').pop().replace(/\.[^.]+$/, '');
  return `/images/${base}.jpg`;
}

export const images = {
  hero: '/images/hero.jpg',
  'product-camera': '/images/product-camera.jpg',
  'product-hub': '/images/product-hub.jpg',
  'product-lamp': '/images/product-lamp.jpg',
  'product-sensor': '/images/product-sensor.jpg',
  'scenario-climate': '/images/scenario-climate.jpg',
  'scenario-home': '/images/scenario-home.jpg',
  'scenario-light': '/images/scenario-light.jpg',
  'scenario-security': '/images/scenario-security.jpg',
};
