import styles from './Theme.module.scss';
import { Theme, useTheme } from 'app/providers/Theme/context';

type Props = {
  value: string;
  onChange: (theme: string) => void;
};

export const ThemeSwitcher = ({value,onChange}:Props)=> {
  const themes = ['pink', 'blue', 'green', 'coffee', 'dark'];
  const {theme, setTheme} = useTheme()

  return (
    <div className={styles.theme}>
      {themes.map((element) => (
        <button
          key={element}
          type='button'
          className={`${styles.btn} ${value === element ? styles.active : styles[element]}`}
          aria-label={`Switch to ${element} theme`}
          onClick={() => onChange(element)}
        />
      ))}
    </div>
  );
}
