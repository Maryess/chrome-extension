
import { ReactNode } from "react"
import styles from './styles.module.scss'
import { Link } from "react-router-dom"

export default ({children}:{children:ReactNode}) =>{
    return(
        <div className={styles.container}>
            <header className={styles.layout}>
                <div className={styles.layout__logo}>
                    <span>PerfectStyles</span>  
                </div>
                <nav className={styles.layout__nav}>
                    <Link to="/">home</Link>
                    <Link to="/settings">settings</Link>
                    <Link to="/contacts">contacts</Link>
                    <Link to="/login">signin</Link>
                </nav>
            </header>
            <div className={styles.content}>
            {children}
            </div>
        </div>
    )
}