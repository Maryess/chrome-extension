
import { ReactNode } from "react"
import styles from './styles.module.scss'
import { Link } from "react-router-dom"

export default ({children}:{children:ReactNode}) =>{
    return(
        <div>
            <header className={styles.layout}>
            <div className={styles.logo}>
                <span>Perfect Site</span>  
            </div>
            <nav className={styles.nav}>
                <Link to="/">home</Link>
                <Link to="/contacts">contacts</Link>
            </nav>
        </header>
        <div className={styles.children}>
        {children}
        </div>
        </div>
    )
}