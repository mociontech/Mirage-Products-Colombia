import { products } from '../../../../content/products';

/**
 * Posiciones absolutas (px, lienzo 1920x1200) leidas del metadata real de
 * Figma (node 488:4, "03_Pantalla seleccion_productos" - get_metadata da
 * x/y/width/height exactos por nodo, sin pasar por porcentajes de inset que
 * se prestan a error de redondeo). photo = nodo "imagenes-XX 1" (los 12
 * confirmados 1:1 contra el frame); logo = el bounding box real del grupo
 * de vectores de cada marca (los compuestos - magnum-22, v32, flux-6l,
 * ci-magnum - se verificaron contra el aspect ratio de su asset ya
 * recortado, calzan). xlife es el unico que get_metadata no devolvio (el
 * nodo no aparecio en el arbol) - se dejo el valor ya validado de una
 * iteracion anterior, que cae dentro de su tarjeta (card, ver
 * ProductSelect.tsx) sin problema.
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProductTile {
  productId: string;
  photo: Rect;
  logo: Rect;
}

export const productTiles: ProductTile[] = [
  {
    productId: 'magnum-22',
    photo: { x: 155, y: 356, width: 218, height: 121 },
    logo: { x: 125, y: 282, width: 277, height: 55 },
  },
  {
    productId: 'nex',
    photo: { x: 596, y: 348, width: 236, height: 138 },
    logo: { x: 614, y: 268, width: 198, height: 86 },
  },
  {
    productId: 'v32',
    photo: { x: 1057, y: 329, width: 214, height: 138 },
    logo: { x: 1077, y: 265, width: 175, height: 72 },
  },
  {
    productId: 'neo-inverter',
    photo: { x: 153, y: 657, width: 222, height: 141 },
    logo: { x: 128, y: 567, width: 275, height: 78 },
  },
  {
    productId: 'turbo-flux',
    photo: { x: 770, y: 576, width: 106, height: 168 },
    logo: { x: 558, y: 604, width: 200, height: 111 },
  },
  {
    productId: 'flux-6l',
    photo: { x: 1222, y: 581, width: 113, height: 157 },
    logo: { x: 1012, y: 619, width: 206, height: 82 },
  },
  {
    productId: 'flux-electric',
    photo: { x: 314, y: 877, width: 120, height: 169 },
    logo: { x: 111, y: 906, width: 197, height: 112 },
  },
  {
    productId: 'ci-magnum',
    photo: { x: 586, y: 951, width: 255, height: 137 },
    logo: { x: 668, y: 878, width: 92, height: 85 },
  },
  {
    productId: 'xtra-multi',
    photo: { x: 1043, y: 956, width: 243, height: 107 },
    logo: { x: 1027, y: 858, width: 275, height: 88 },
  },
  {
    productId: 'x32',
    photo: { x: 1578, y: 345, width: 200, height: 133 },
    logo: { x: 1564, y: 264, width: 227, height: 93 },
  },
  {
    productId: 'xlife',
    photo: { x: 1580, y: 621, width: 195, height: 135 },
    logo: { x: 1526, y: 546, width: 267, height: 99 },
  },
  {
    productId: 'life-12',
    photo: { x: 1570, y: 921, width: 215, height: 135 },
    logo: { x: 1556, y: 866, width: 243, height: 48 },
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
