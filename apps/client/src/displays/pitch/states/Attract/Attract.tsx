import { VideoLayer, type VideoSource } from '../../../../components/VideoLayer/VideoLayer';
import attractLogoLoop from '../../../../assets/video/attract-logo-loop.mp4';

/**
 * Transicion breve entre IDLE/Loop y el contenido de producto, mientras el
 * usuario recien empieza en la tablet y todavia no toca ningun producto.
 * No hay pantalla propia en Figma para este estado (ver Fase 0).
 *
 * TEMPORAL: mismo video de Mirage-Products-Mexico (logo animado) - todavia
 * no nos entregaron el video institucional propio de Colombia. Reemplazar
 * este import (y el archivo en assets/video/attract-logo-loop.mp4) apenas
 * llegue el definitivo.
 */
const SOURCES: VideoSource[] = [{ id: 'attract', src: attractLogoLoop }];

export function Attract() {
  return <VideoLayer sources={SOURCES} activeId="attract" />;
}
