import styles from './styles.module.scss'

import { Link } from 'react-router-dom'

function Header() {
    return (
        <header className={styles.headerContainer}>

            <div className={styles.headerContent}>

                <Link className='brain' to="/home">
                    <img src="/brain.svg" alt="" />
                </Link>

                <span>FilosoKids</span>

            </div>

            <div className={styles.headerInformation}>

                <span>Fase: 1</span>
             
                <div className={styles.progressBarContainer}> 
                    <div className={styles.backProgressBar}>
                        <div className={styles.progressBar}></div>
                    </div>
                </div>

            </div>

            <nav className={styles.headerNav}>
                <img src="/menu.svg" alt="" />
            </nav>

        </header>
    )
}

export default Header