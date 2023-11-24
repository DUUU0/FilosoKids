import Button from "../../components/Button"
import { Link } from "react-router-dom"

import styles from './styles.module.scss'

function Home() {
    return (

        <main className={styles.main}>
            <div className={styles.button}>
                <Link to='questions'><Button>Jogar</Button></Link>
            </div>
        </main>

    )
}

export default Home