import { Link } from "@chakra-ui/react"
import { ReactNode } from "react"
import styles from './styles.module.scss'

export default ({children}:{children:ReactNode}) =>{
    return(
        <div>
            <header className={styles.layout}>
            <div className={styles.logo}>
                <span>Perfect site</span>  
            </div>
            <nav className={styles.nav}>
                <Link href="/">home</Link>
                <Link href="/contacts">contacts</Link>
            </nav>
        </header>
        {children}
        </div>
    )
}