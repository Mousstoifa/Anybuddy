import styles from './header.module.css'; // Import des styles CSS

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Anybuddy</div>
      <nav>
        <ul className={styles.navLinks}>
          <li><a href="/">Accueil</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/Profil">Profil</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
