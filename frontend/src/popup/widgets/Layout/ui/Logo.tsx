import styles from '../Layout.module.scss'
import logo from 'public/icons/perfect-styles.svg'

export const Logo = () => {
    return (
         <div className={styles.logo}>
            {!chrome.runtime ?  <img src={logo} alt="logo"/> :<img src={''}/> }
        </div>
    )
}