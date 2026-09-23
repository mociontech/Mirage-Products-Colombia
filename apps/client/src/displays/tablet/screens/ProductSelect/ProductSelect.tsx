import { useEffect, useRef, useState } from 'react';
import logoMirage from '../../../../assets/images/logo-mirage-select.svg';
import { BrandFrame } from '../../../../components/BrandFrame/BrandFrame';
import { getProductById } from '../../../../content/products';
import styles from './ProductSelect.module.css';
import { productCards, productTiles } from './tiles';

interface ProductSelectProps {
  selectedProductId: string | null;
  onPreview: (productId: string) => void;
  onConfirm: (productId: string) => void;
}

/**
 * Layout final de seleccion de producto - version Colombia (Figma node
 * 488:4, "03_Pantalla seleccion_productos", canvas 1920x1200 - ver
 * comentario en Home.tsx sobre por que los px literales sirven de
 * coordenadas absolutas). Grid 3x3 a la izquierda + franja roja lateral con
 * 3 productos mas (12 en total), distinto al layout de banda horizontal de
 * Mexico. Cada tile es una tarjeta con fondo degradado (ver
 * tiles.ts#productCards, antes ausente) + foto y logo como capas
 * independientes encima, cada una en su posicion exacta de Figma
 * (tiles.ts#productTiles, tomado de get_metadata, no de porcentajes).
 *
 * Al seleccionar un producto, el tile pulsa (escala + fade) - el boton
 * nunca se remonta (destruiria y redecodificaria las imagenes en cada
 * toque = lag notorio); la animacion se reinicia a mano quitando y
 * volviendo a poner la clase sobre el mismo nodo del DOM. Ningun tile trae
 * animacion en el montaje inicial (evita que los 12 animen juntos al
 * entrar a la pantalla).
 */
export function ProductSelect({ selectedProductId, onPreview, onConfirm }: ProductSelectProps) {
  const [pulseNonce, setPulseNonce] = useState(0);
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (!selectedProductId) return;
    const el = tileRefs.current[selectedProductId];
    if (!el) return;
    el.classList.remove(styles.pulsing);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetWidth; // fuerza reflow para que el navegador "olvide" el estado anterior de la animacion
    el.classList.add(styles.pulsing);
  }, [selectedProductId, pulseNonce]);

  return (
    <BrandFrame>
      <img src={logoMirage} alt="Mirage" className={`${styles.logo} enterFromTop`} />
      <div className={styles.sidebar} />

      {productTiles.map((tile, index) => {
        const product = getProductById(tile.productId);
        const card = productCards[tile.productId];
        if (!product || !card) return null;
        const isSelected = product.id === selectedProductId;

        return (
          <button
            key={product.id}
            ref={(el) => {
              tileRefs.current[product.id] = el;
            }}
            type="button"
            aria-label={product.name}
            className={`${styles.tile} ${card.variant === 'red' ? styles.tileRed : styles.tileLight} ${isSelected ? styles.selected : ''} enterScale`}
            style={{ left: card.x, top: card.y, width: card.width, height: card.height, animationDelay: `${index * 45}ms` }}
            onClick={() => {
              onPreview(product.id);
              setPulseNonce((count) => count + 1);
            }}
          >
            <img
              src={product.photoImage}
              alt=""
              className={styles.photo}
              style={{
                left: tile.photo.x - card.x,
                top: tile.photo.y - card.y,
                width: tile.photo.width,
                height: tile.photo.height,
              }}
            />
            <img
              src={product.logoImage}
              alt={product.name}
              className={styles.logoTile}
              style={{
                left: tile.logo.x - card.x,
                top: tile.logo.y - card.y,
                width: tile.logo.width,
                height: tile.logo.height,
              }}
            />
          </button>
        );
      })}

      {selectedProductId && (
        <button
          type="button"
          className={`${styles.confirmButton} enterFromRight`}
          onClick={() => onConfirm(selectedProductId)}
        >
          Continuar
        </button>
      )}
    </BrandFrame>
  );
}
