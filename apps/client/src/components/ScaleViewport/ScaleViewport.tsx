import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './ScaleViewport.module.css';

interface ScaleViewportProps {
  /** Ancho del lienzo de diseno (viewport de referencia en Figma), en px. */
  designWidth: number;
  /** Alto del lienzo de diseno (viewport de referencia en Figma), en px. */
  designHeight: number;
  /**
   * Cuando es true, no escala nada: los children se renderizan a tamano
   * natural, llenando el viewport real. Pensado para pantallas puntuales que
   * ya tienen su propio layout responsive (media queries reales, no un
   * lienzo fijo reescalado) y no deben quedar encogidas como miniatura
   * dentro del recuadro de diseno 1920x1200 en un celular angosto - ver
   * useIsMobile.ts. El resto de la app (todo lo que no pasa esta prop) sigue
   * escalando exactamente igual que antes.
   */
  disableScale?: boolean;
  children: ReactNode;
}

/**
 * Escala un lienzo de tamano fijo (el viewport de diseno de Figma) para que
 * quepa completo en cualquier resolucion real de tablet o pantalla de pitch,
 * sin recortar ni deformar. No sabemos aun el modelo/resolucion exacta de
 * ninguno de los dos dispositivos, asi que todo el layout se construye contra
 * un lienzo fijo y esta capa hace el fit-to-screen en tiempo real.
 */
export function ScaleViewport({ designWidth, designHeight, disableScale, children }: ScaleViewportProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / designWidth, window.innerHeight / designHeight),
  );

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const updateScale = () => {
      const { clientWidth, clientHeight } = outer;
      const nextScale = Math.min(clientWidth / designWidth, clientHeight / designHeight);
      setScale(nextScale > 0 ? nextScale : 1);
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(outer);
    return () => observer.disconnect();
  }, [designWidth, designHeight]);

  if (disableScale) {
    return (
      <div ref={outerRef} className={styles.naturalOuter}>
        {children}
      </div>
    );
  }

  return (
    <div ref={outerRef} className={styles.outer}>
      <div
        className={styles.inner}
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
