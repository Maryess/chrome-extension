import styles from './Theme.module.scss';
import { Theme, useTheme } from 'app/providers/Theme/context';

export const ThemeSwitcher = ()=> {
  const themes = ['pink', 'blue', 'green', 'coffee', 'dark'];
  const {theme, setTheme} = useTheme()

  const handleChangeTheme = (newTheme:string) => {
    setTheme(newTheme as Theme);
  };

  return (
    <div className={styles.theme}>
      {themes.map((element) => (
        <button
          key={element}
          type='submit'
          className={`${styles.btn} ${theme === element ? styles.active : styles[element]}`}
          aria-label={`Switch to ${element} theme`}
          onClick={() => handleChangeTheme(element)}
        />
      ))}
    </div>
  );
}
