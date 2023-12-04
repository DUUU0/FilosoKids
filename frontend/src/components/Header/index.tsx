import { useState } from 'react';
import styles from './styles.module.scss'
import { Link } from 'react-router-dom';

function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/brain.svg" alt="" />
                <span>FilosoKids</span>
            </div>
            <nav className={styles.headerNav}>
                <img src="/menu.svg" alt="" onClick={() => setShowDropdown(!showDropdown)} />
                <div className={styles.dropdown} style={{ display: showDropdown ? 'block' : 'none' }}>
                    <Link to="/HelpLogin"><button>Ajuda</button></Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;
