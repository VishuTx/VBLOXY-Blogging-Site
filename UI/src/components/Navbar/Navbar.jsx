import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>VBLOXY</Link>
        <div className={styles.links}>
          <Link to="/explore">Explore</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={toggleTheme} className={styles.themeToggle}>
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
          <Link to="/signin" className={styles.button}>Sign In</Link>
          <Link to="/signup" className={`${styles.button} ${styles.primary}`}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}