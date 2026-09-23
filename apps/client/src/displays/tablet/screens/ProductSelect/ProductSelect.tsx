import { useEffect, useRef, useState } from 'react';
import logoMirage from '../../../../assets/images/logo-mirage-select.svg';
import { BrandFrame } from '../../../../components/BrandFrame/BrandFrame';
import { Button } from '../../../../components/Button/Button';
import { getProductById, products } from '../../../../content/products';
import { useIsMobile } from '../../../../hooks/useIsMobile';
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
 * Foto y logo de cada producto son capas separadas (ver tiles.ts), no un
 * recorte compuesto, cada una en su posicion exacta de Figma.
 *
 * Al seleccionar un producto, el tile pulsa (escala + fade) - el boton
 * nunca se remonta (destruiria y redecodificaria las imagenes en cada
 * toque = lag notorio); la animacion se reinicia a mano quitando y
 * volviendo a poner la clase sobre el mismo nodo del DOM. Ningun tile trae
 * animacion en el montaje inicial (evita que los 12 animen juntos al
 * entrar a la pantalla).
 *
 * En movil (useIsMobile, TabletApp le pasa disableScale a ScaleViewport para
 * esta pantalla) se renderiza una segunda variante con layout real en CSS
 * grid/flex (no el lienzo 1920x1200 reescalado) - la franja roja lateral se
 * reacomoda debajo del grid en vez de al costado. Mismos productos, mismos
 * assets (photoImage/logoImage de content/products.ts), mismo
 * onPreview/onConfirm; solo cambia la disposicion visual.
 */
export function ProductSelect({ selectedProductId, onPreview, onConfirm }: ProductSelectProps) {
  const [pulseNonce, setPulseNonce] = useState(0);
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!selectedProductId) return;
    const el = tileRefs.current[selectedProductId];
    if (!el) return;
    el.classList.remove(styles.pulsing);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetWidth; // fuerza reflow para que el navegador "olvide" el estado anterior de la animacion
    el.classList.add(styles.pulsing);
  }, [selectedProductId, pulseNonce]);

  if (isMobile) {
    // Mismo orden que content/products.ts: los primeros 9 van en el grid
    // blanco (xtra-multi al final, ocupando el ancho completo), los ultimos
    // 3 (x32, xlife, life-12) son exactamente los que en desktop viven en la
    // franja roja lateral - aca van en el bloque rojo de abajo.
    const gridProducts = products.slice(0, 9);
    const redProducts = products.slice(9);

    const handleTap = (productId: string) => {
      onPreview(productId);
      setPulseNonce((count) => count + 1);
    };

    return (
      <div className={styles.mobileShell}>
        <header className={styles.mobileHeader}>
          <img src={logoMirage} alt="Mirage" className={styles.mobileLogo} />
        </header>

        <div className={styles.mobileGrid}>
          {gridProducts.map((product) => {
            const isSelected = product.id === selectedProductId;
            const isWide = product.id === 'xtra-multi';
            return (
              <button
                key={product.id}
                ref={(el) => {
                  tileRefs.current[product.id] = el;
                }}
                type="button"
                aria-label={product.name}
                className={`${styles.mobileCard} ${isWide ? styles.mobileCardWide : ''} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleTap(product.id)}
              >
                <img src={product.logoImage} alt={product.name} className={styles.mobileCardLogo} />
                <img src={product.photoImage} alt="" className={styles.mobileCardPhoto} />
              </button>
            );
          })}
        </div>

        <div className={styles.mobileRedBlock}>
          {redProducts.map((product) => {
            const isSelected = product.id === selectedProductId;
            return (
              <button
                key={product.id}
                ref={(el) => {
                  tileRefs.current[product.id] = el;
                }}
                type="button"
                aria-label={product.name}
                className={`${styles.mobileRedRow} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleTap(product.id)}
              >
                <img src={product.logoImage} alt={product.name} className={styles.mobileRedLogo} />
                <img src={product.photoImage} alt="" className={styles.mobileRedPhoto} />
              </button>
            );
          })}
        </div>

        {selectedProductId && (
          <div className={styles.mobileConfirmRow}>
            <Button onClick={() => onConfirm(selectedProductId)}>Continuar</Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <BrandFrame>
      <img src={logoMirage} alt="Mirage" className={styles.logo} />
      <p className={styles.hint}>Toca y explora</p>
      <div className={styles.sidebar} />

      {productTiles.map((tile) => {
        const product = getProductById(tile.productId);
        if (!product) return null;
        const isSelected = product.id === selectedProductId;

        const left = Math.min(tile.photo.x, tile.logo.x);
        const top = Math.min(tile.photo.y, tile.logo.y);
        const right = Math.max(tile.photo.x + tile.photo.width, tile.logo.x + tile.logo.width);
        const bottom = Math.max(tile.photo.y + tile.photo.height, tile.logo.y + tile.logo.height);

        return (
          <button
            key={product.id}
            ref={(el) => {
              tileRefs.current[product.id] = el;
            }}
            type="button"
            aria-label={product.name}
            className={`${styles.tile} ${isSelected ? styles.selected : ''}`}
            style={{ left, top, width: right - left, height: bottom - top }}
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
                left: tile.photo.x - left,
                top: tile.photo.y - top,
                width: tile.photo.width,
                height: tile.photo.height,
              }}
            />
            <img
              src={product.logoImage}
              alt={product.name}
              className={styles.logoTile}
              style={{
                left: tile.logo.x - left,
                top: tile.logo.y - top,
                width: tile.logo.width,
                height: tile.logo.height,
              }}
            />
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
