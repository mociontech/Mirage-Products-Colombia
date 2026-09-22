import fondoPitch from '../../../../assets/images/pitch-co/FondoPitch.png';
import { ParticlesLayer } from '../../../../components/ParticlesLayer/ParticlesLayer';
import styles from './Idle.module.css';

/**
 * Estado por defecto y fallback universal ante error/timeout/desconexion,
 * cuando no hay interaccion. FondoPitch.png (dado por el cliente) - el loop
 * de video institucional real todavia no existe (ver assets-manifest.md), y
 * el placeholder anterior era un video de color solido que tapaba
 * cualquier imagen de fondo, asi que por ahora esta pantalla es estatica,
 * con una capa de particulas flotando encima para que no se sienta
 * completamente quieta mientras no llega el video real.
 */
export function Idle() {
  return (
    <div className={styles.background}>
      <img src={fondoPitch} alt="" className={styles.backgroundImage} />
      <ParticlesLayer />
    </div>
  );
}
