import { products } from '../../../../content/products';

/**
 * Posiciones absolutas (px, lienzo 1920x1200) de cada elemento del grid de
 * seleccion de Colombia (Figma node 488:4, "03_Pantalla seleccion_productos"),
 * leidas directo de la metadata de Figma (photo = nodo "imagenes-XX 1", logo
 * = el grupo de vectores mas cercano por posicion) - no son recortes
 * compuestos, cada producto trae su foto y su logo como capas separadas,
 * igual que en el tablero de Mexico.
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
    photo: { x: 154, y: 358, width: 276, height: 173 },
    logo: { x: 146, y: 306, width: 321, height: 64 },
  },
  {
    productId: 'nex',
    photo: { x: 611, y: 366, width: 280, height: 144 },
    logo: { x: 664, y: 287, width: 230, height: 100 },
  },
  {
    productId: 'v32',
    photo: { x: 1018, y: 361, width: 245, height: 150 },
    logo: { x: 1036, y: 282, width: 203, height: 84 },
  },
  {
    productId: 'neo-inverter',
    photo: { x: 125, y: 641, width: 305, height: 199 },
    logo: { x: 144, y: 548, width: 319, height: 90 },
  },
  {
    productId: 'turbo-flux',
    photo: { x: 688, y: 654, width: 114, height: 188 },
    logo: { x: 644, y: 519, width: 233, height: 129 },
  },
  {
    productId: 'flux-6l',
    photo: { x: 1100, y: 636, width: 132, height: 208 },
    logo: { x: 1037, y: 534, width: 254, height: 101 },
  },
  {
    productId: 'flux-electric',
    photo: { x: 205, y: 989, width: 131, height: 209 },
    logo: { x: 189, y: 877, width: 223, height: 126 },
  },
  {
    productId: 'ci-magnum',
    photo: { x: 572, y: 995, width: 358, height: 159 },
    logo: { x: 685, y: 876, width: 136, height: 125 },
  },
  {
    productId: 'xtra-multi',
    photo: { x: 1019, y: 994, width: 313, height: 162 },
    logo: { x: 992, y: 883, width: 319, height: 103 },
  },
  {
    productId: 'x32',
    photo: { x: 1554, y: 356, width: 257, height: 154 },
    logo: { x: 1537, y: 256, width: 263, height: 108 },
  },
  {
    productId: 'xlife',
    photo: { x: 1546, y: 635, width: 257, height: 152 },
    logo: { x: 1526, y: 546, width: 267, height: 99 },
  },
  {
    productId: 'life-12',
    photo: { x: 1554, y: 971, width: 257, height: 156 },
    logo: { x: 1529, y: 897, width: 282, height: 56 },
  },
];

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
