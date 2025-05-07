import { useThemeStore } from 'store/store';
import styles from './Theme.module.scss';

export default function ThemeSelector() {
  const themes = ['pink', 'blue', 'green', 'coffee', 'dark'];
  const setTheme = useThemeStore((s) => s.setTheme);
  const theme = useThemeStore((s) => s.theme);

  const handleChangeTheme = (newTheme:string) => {
    setTheme(newTheme);
  };

  return (
    <div className={styles.theme}>
      {themes.map((element) => (
        <button
          key={element}
          type='submit'
          className={`${styles.btn} ${theme === element ? styles.active : ''}`}
          onClick={() => handleChangeTheme(element)}
        />
      ))}
    </div>
  );
}
