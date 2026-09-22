import { useEffect, useRef, useState } from 'react';
import logoMirage from '../../../../assets/images/logo-mirage-select.svg';
import { BrandFrame } from '../../../../components/BrandFrame/BrandFrame';
import { Button } from '../../../../components/Button/Button';
import { getProductById } from '../../../../content/products';
import styles from './ProductSelect.module.css';
import { productTiles } from './tiles';

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
 * 3 productos mas (12 en total, ver tiles.ts), distinto al layout de banda
 * horizontal de Mexico. Cada tile es una zona tactil que emite
 * PRODUCT_PREVIEW; el pitch reacciona en vivo mientras el usuario explora.
 *
 * Al seleccionar un producto, el tile pulsa (escala + fade) - la primera
 * version remontaba el boton entero (key distinta) para que la animacion
 * CSS se repitiera, pero eso forzaba al navegador a destruir y redecodificar
 * la imagen en cada toque = lag notorio. Ahora el boton nunca se remonta:
 * se reinicia la animacion a mano (quitar la clase, forzar reflow, volver a
 * ponerla) sobre el mismo nodo del DOM, y ningun tile trae animacion en el
 * montaje inicial (evita que las 12 fotos animen juntas al entrar a la
 * pantalla, que tambien se sentia pesado).
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
      <img src={logoMirage} alt="Mirage" className={styles.logo} />
      <p className={styles.hint}>Toca y explora</p>
      <div className={styles.sidebar} />

      {productTiles.map((tile) => {
        const product = getProductById(tile.productId);
        if (!product) return null;
        const isSelected = product.id === selectedProductId;

        return (
          <button
            key={product.id}
            ref={(el) => {
              tileRefs.current[product.id] = el;
            }}
            type="button"
            aria-label={product.name}
            className={`${styles.tile} ${isSelected ? styles.selected : ''}`}
            style={{ left: tile.rect.x, top: tile.rect.y, width: tile.rect.width, height: tile.rect.height }}
            onClick={() => {
              onPreview(product.id);
              setPulseNonce((count) => count + 1);
            }}
          >
            <img src={product.tileImage} alt="" className={styles.tileImage} />
          </button>
        );
      })}

      {selectedProductId && (
        <div className={styles.confirmRow}>
          <Button onClick={() => onConfirm(selectedProductId)}>Continuar</Button>
        </div>
      )}
    </BrandFrame>
  );
}
