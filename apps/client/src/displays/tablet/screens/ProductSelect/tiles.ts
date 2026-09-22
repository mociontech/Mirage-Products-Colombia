import { products } from '../../../../content/products';

/**
 * Posiciones absolutas (px, lienzo 1920x1200) del grid de seleccion de
 * Colombia (Figma node 488:4, "03_Pantalla seleccion_productos") - un grid
 * 3x3 a la izquierda mas una franja roja lateral con 3 productos, layout
 * distinto al de Mexico (banda roja horizontal). Cada rect coincide en
 * proporcion con el recorte compuesto (logo + foto) usado como tileImage,
 * para que la imagen no se distorsione.
 */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ProductTile {
  productId: string;
  rect: Rect;
}

export const productTiles: ProductTile[] = [
  { productId: 'magnum-22', rect: { x: 80, y: 200, width: 420, height: 350 } },
  { productId: 'nex', rect: { x: 540, y: 200, width: 420, height: 350 } },
  { productId: 'v32', rect: { x: 980, y: 200, width: 420, height: 350 } },
  { productId: 'neo-inverter', rect: { x: 80, y: 470, width: 420, height: 400 } },
  { productId: 'turbo-flux', rect: { x: 540, y: 470, width: 420, height: 400 } },
  { productId: 'flux-6l', rect: { x: 980, y: 470, width: 420, height: 400 } },
  { productId: 'flux-electric', rect: { x: 80, y: 800, width: 420, height: 400 } },
  { productId: 'ci-magnum', rect: { x: 540, y: 800, width: 420, height: 400 } },
  { productId: 'xtra-multi', rect: { x: 980, y: 800, width: 420, height: 400 } },
  { productId: 'x32', rect: { x: 1435, y: 150, width: 485, height: 390 } },
  { productId: 'xlife', rect: { x: 1435, y: 470, width: 485, height: 390 } },
  { productId: 'life-12', rect: { x: 1435, y: 800, width: 485, height: 400 } },
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
