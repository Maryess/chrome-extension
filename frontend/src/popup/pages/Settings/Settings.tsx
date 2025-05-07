import { Theme } from 'components/index'
import styles from './Settings.module.scss'

export default ()=>{
    return (
        <div className={styles.settings}>
            <Theme/>
        </div>
    )
}