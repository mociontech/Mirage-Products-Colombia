import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT_PX = 768;

/**
 * true cuando el viewport real (nunca el lienzo escalado por ScaleViewport)
 * es de ancho movil. Sirve para decidir, screen por screen, cuando saltarse
 * el fit-to-screen de ScaleViewport (que encoge todo el lienzo 1920x1200
 * como miniatura en una pantalla angosta) y renderizar en su lugar un
 * layout responsive real - ver ScaleViewport.tsx#disableScale.
 */
export function useIsMobile(breakpointPx: number = MOBILE_BREAKPOINT_PX): boolean {
  const query = `(max-width: ${breakpointPx}px)`;
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, [query]);

  return isMobile;
}
