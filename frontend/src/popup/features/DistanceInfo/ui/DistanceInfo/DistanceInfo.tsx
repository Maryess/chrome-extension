import { Heading } from 'shared/ui/Heading'
import styles from './DistanceInfo.module.scss'

export const DistanceInfo = () => {
  return (
    <div className={styles.info}>
        <p><kbd>Alt</kbd> + <kbd>Right Click</kbd> — Measure distance</p>
        <p><kbd>Ctrl</kbd> + <kbd>Shift</kbd> — Show distance info</p>
    </div>
  )
}
