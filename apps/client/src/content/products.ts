import tileMagnum22 from '../assets/images/products-co/magnum-22.webp';
import tileNex from '../assets/images/products-co/nex.webp';
import tileV32 from '../assets/images/products-co/v32.webp';
import tileNeo from '../assets/images/products-co/neo-inverter.webp';
import tileTurboFlux from '../assets/images/products-co/turbo-flux.webp';
import tileFlux6l from '../assets/images/products-co/flux-6l.webp';
import tileFluxElectric from '../assets/images/products-co/flux-electric.webp';
import tileCiMagnum from '../assets/images/products-co/ci-magnum.webp';
import tileXtraMulti from '../assets/images/products-co/xtra-multi.webp';
import tileX32 from '../assets/images/products-co/x32.webp';
import tileXlife from '../assets/images/products-co/xlife.webp';
import tileLife12 from '../assets/images/products-co/life-12.webp';

import pitchMagnum22 from '../assets/images/pitch-co/pitch-magnum22.webp';
import pitchNex from '../assets/images/pitch-co/pitch-nex.webp';
import pitchV32 from '../assets/images/pitch-co/pitch-v32.webp';
import pitchNeo from '../assets/images/pitch-co/pitch-neo.webp';
import pitchTurboFlux from '../assets/images/pitch-co/pitch-turboflux.webp';
import pitchFlux6l from '../assets/images/pitch-co/pitch-flux6l.webp';
import pitchFluxElectric from '../assets/images/pitch-co/pitch-fluxelectric.webp';
import pitchCiMagnum from '../assets/images/pitch-co/pitch-cimagnum.webp';
import pitchXtraMulti from '../assets/images/pitch-co/pitch-xtramulti.webp';
import pitchX32 from '../assets/images/pitch-co/pitch-x32.webp';
import pitchXlife from '../assets/images/pitch-co/pitch-xlife.webp';
import pitchLife12 from '../assets/images/pitch-co/pitch-life12.webp';

/**
 * Catalogo de producto - version Colombia. Agregar un producto nuevo es
 * sumar una entrada aqui y soltar sus assets en assets/images - nunca
 * hardcodear contenido de producto en un componente.
 *
 * El tile de seleccion (ProductSelect) viene del frame de Figma
 * "03_Pantalla seleccion_productos" (node 488:4) - un grid 3x3 + una franja
 * roja lateral con 3 productos mas, layout distinto al de Mexico (banda roja
 * horizontal). tileImage es un recorte compuesto (logo + foto ya juntos tal
 * como aparecen en el diseno) en vez de logo/foto por separado, porque en
 * este layout cada tile ya viene armado como una sola composicion visual.
 *
 * El pitchImage de cada producto viene de las 12 pantallas verticales
 * completas de Figma (nodes 493:7-43, layer "MEX" - nombre de capa
 * desactualizado por copia/pega, pero el contenido y el dominio del pie de
 * pagina, www.airesmirage.co, confirman que es contenido real de Colombia).
 */
export interface Product {
  id: string;
  /** Nombre real de marca, confirmado desde el logo de Figma. */
  name: string;
  /** Recorte compuesto (logo + foto) para el tile de seleccion (ProductSelect). */
  tileImage: string;
  /** Banner vertical completo (logo + foto + copy + features) para el pitch. */
  pitchImage: string;
}

export const products: Product[] = [
  {
    id: 'magnum-22',
    name: 'Magnum Inverter 22',
    tileImage: tileMagnum22,
    pitchImage: pitchMagnum22,
  },
  {
    id: 'nex',
    name: 'NEX',
    tileImage: tileNex,
    pitchImage: pitchNex,
  },
  {
    id: 'v32',
    name: 'V32 Inverter',
    tileImage: tileV32,
    pitchImage: pitchV32,
  },
  {
    id: 'neo-inverter',
    name: 'Neo Inverter',
    tileImage: tileNeo,
    pitchImage: pitchNeo,
  },
  {
    id: 'turbo-flux',
    name: 'Turbo Flux Series',
    tileImage: tileTurboFlux,
    pitchImage: pitchTurboFlux,
  },
  {
    id: 'flux-6l',
    name: 'Flux 6L Series',
    tileImage: tileFlux6l,
    pitchImage: pitchFlux6l,
  },
  {
    id: 'flux-electric',
    name: 'Flux Electric',
    tileImage: tileFluxElectric,
    pitchImage: pitchFluxElectric,
  },
  {
    id: 'ci-magnum',
    name: 'Ci Magnum',
    tileImage: tileCiMagnum,
    pitchImage: pitchCiMagnum,
  },
  {
    id: 'xtra-multi',
    name: 'Xtra Multi Inverter',
    tileImage: tileXtraMulti,
    pitchImage: pitchXtraMulti,
  },
  {
    id: 'x32',
    name: 'X32 Inverter',
    tileImage: tileX32,
    pitchImage: pitchX32,
  },
  {
    id: 'xlife',
    name: 'XLife',
    tileImage: tileXlife,
    pitchImage: pitchXlife,
  },
  {
    id: 'life-12',
    name: 'Life 12',
    tileImage: tileLife12,
    pitchImage: pitchLife12,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
