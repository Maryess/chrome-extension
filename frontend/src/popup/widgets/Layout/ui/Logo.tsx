import styles from '../Layout.module.scss'

export const Logo = () => {

    const word = 'Perfect'
    return (
         <div className={styles.logo}>
            <p>
                <span>
                    {word.split("").map((char, i) => (
                        <span key={i} className={styles.letter}>{char}</span>
                    ))}
                </span>
                Styles
            </p>
        </div>
    )
}