import { products } from '../../../../content/products';

/**
 * Posiciones absolutas (px, lienzo 1920x1200) leidas del metadata real de
 * Figma (node 488:4, "03_Pantalla seleccion_productos" - get_metadata da
 * x/y/width/height exactos por nodo, sin pasar por porcentajes de inset que
 * se prestan a error de redondeo). photo = nodo "imagenes-XX 1" (los 12
 * confirmados 1:1 contra el frame); logo = el bounding box real del grupo
 * de vectores de cada marca (los compuestos - magnum-22, v32, flux-6l,
 * ci-magnum - se verificaron contra el aspect ratio de su asset ya
 * recortado). Cada foto conserva ademas el zoom/desplazamiento interno de
 * Figma. XLife recupera su logo blanco sobre la tarjeta roja, centrado sobre
 * el equipo.
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageCrop {
  left: string;
  top: string;
  width: string;
  height: string;
}

export interface ProductTile {
  productId: string;
  photo: Rect & { crop: ImageCrop };
  logo?: Rect;
}

export const productTiles: ProductTile[] = [
  {
    productId: 'magnum-22',
    photo: {
      x: 155,
      y: 356,
      width: 218,
      height: 121,
      crop: { left: '-8.72%', top: '-23.38%', width: '108.72%', height: '123.18%' },
    },
    logo: { x: 125, y: 281.807, width: 276.543, height: 54.739 },
  },
  {
    productId: 'nex',
    photo: {
      x: 596,
      y: 348,
      width: 236,
      height: 138,
      crop: { left: '-15.05%', top: '-14.28%', width: '129.57%', height: '114.19%' },
    },
    logo: { x: 614, y: 268, width: 198.069, height: 85.909 },
  },
  {
    productId: 'v32',
    photo: {
      x: 1057,
      y: 329,
      width: 214,
      height: 138,
      crop: { left: '-4.57%', top: '-0.2%', width: '104.69%', height: '100%' },
    },
    logo: { x: 1077, y: 265, width: 174.818, height: 72.091 },
  },
  {
    productId: 'neo-inverter',
    photo: {
      x: 153,
      y: 657,
      width: 222,
      height: 141,
      crop: { left: '-15%', top: '-18.62%', width: '115.08%', height: '118.62%' },
    },
    logo: { x: 128, y: 567, width: 274.714, height: 77.495 },
  },
  {
    productId: 'turbo-flux',
    photo: {
      x: 770,
      y: 576,
      width: 106,
      height: 168,
      crop: { left: '-0.06%', top: '-1.79%', width: '100.12%', height: '104.17%' },
    },
    logo: { x: 558, y: 604, width: 200.189, height: 111.091 },
  },
  {
    productId: 'flux-6l',
    photo: {
      x: 1222,
      y: 581,
      width: 113,
      height: 157,
      crop: { left: '-0.33%', top: '-14.01%', width: '100.67%', height: '114.01%' },
    },
    logo: { x: 1012, y: 619, width: 206.163, height: 81.978 },
  },
  {
    productId: 'flux-electric',
    photo: {
      x: 314,
      y: 877,
      width: 120,
      height: 169,
      crop: { left: '-0.26%', top: '-7.55%', width: '100.53%', height: '113.21%' },
    },
    logo: { x: 111, y: 906, width: 197, height: 111.597 },
  },
  {
    productId: 'ci-magnum',
    photo: {
      x: 586,
      y: 951,
      width: 255,
      height: 137,
      crop: { left: '-11.54%', top: '-0.1%', width: '121.11%', height: '100%' },
    },
    logo: { x: 668, y: 878, width: 92.01, height: 84.643 },
  },
  {
    productId: 'xtra-multi',
    photo: {
      x: 1043,
      y: 956,
      width: 243,
      height: 107,
      crop: { left: '-8.66%', top: '-19.09%', width: '116.88%', height: '137.93%' },
    },
    logo: { x: 1027, y: 858, width: 274.559, height: 88.295 },
  },
  {
    productId: 'x32',
    photo: {
      x: 1578,
      y: 345,
      width: 200,
      height: 133,
      crop: { left: '-5.23%', top: '-0.2%', width: '110.46%', height: '100%' },
    },
    logo: { x: 1564, y: 264, width: 226.642, height: 92.8 },
  },
  {
    productId: 'xlife',
    photo: {
      x: 1580,
      y: 621,
      width: 195,
      height: 135,
      crop: { left: '-14.05%', top: '0%', width: '117.51%', height: '100%' },
    },
    logo: { x: 1526, y: 546, width: 267, height: 99 },
  },
  {
    productId: 'life-12',
    photo: {
      x: 1570,
      y: 921,
      width: 215,
      height: 135,
      crop: { left: '-3.08%', top: '0%', width: '103.37%', height: '100%' },
    },
    logo: { x: 1556, y: 866.081, width: 243, height: 48.328 },
  },
];

/**
 * Tarjeta (fondo redondeado con degradado + sombra) detras de cada tile -
 * nodos Rectangle 84-97 en Figma, antes ausentes en la implementacion.
 * 9 blancas (grid izquierdo) + 3 rojas (franja lateral), radius 33px,
 * shadow 0px 4px 4px rgba(0,0,0,0.09) en todas.
 */
export interface CardRect extends Rect {
  variant: 'light' | 'red';
}

export const productCards: Record<string, CardRect> = {
  'magnum-22': { x: 84, y: 255, width: 359, height: 225, variant: 'light' },
  nex: { x: 534, y: 255, width: 359, height: 225, variant: 'light' },
  v32: { x: 985, y: 255, width: 359, height: 225, variant: 'light' },
  'neo-inverter': { x: 84, y: 540, width: 359, height: 240, variant: 'light' },
  'turbo-flux': { x: 534, y: 540, width: 359, height: 240, variant: 'light' },
  'flux-6l': { x: 985, y: 540, width: 359, height: 240, variant: 'light' },
  'flux-electric': { x: 84, y: 840, width: 359, height: 240, variant: 'light' },
  'ci-magnum': { x: 534, y: 840, width: 359, height: 240, variant: 'light' },
  'xtra-multi': { x: 985, y: 840, width: 359, height: 240, variant: 'light' },
  x32: { x: 1498, y: 255, width: 359, height: 225, variant: 'red' },
  xlife: { x: 1498, y: 540, width: 359, height: 225, variant: 'red' },
  'life-12': { x: 1498, y: 840, width: 359, height: 225, variant: 'red' },
};

/** Falla temprano en dev si un producto de products.ts no tiene tile o viceversa. */
if (import.meta.env.DEV) {
  const productIds = new Set(products.map((p) => p.id));
  const tileIds = new Set(productTiles.map((t) => t.productId));
  for (const id of productIds) {
    if (!tileIds.has(id)) console.warn(`[ProductSelect] falta tile para el producto "${id}"`);
  }
  for (const id of tileIds) {
    if (!productIds.has(id)) console.warn(`[ProductSelect] tile "${id}" no tiene producto asociado`);
  }
}
