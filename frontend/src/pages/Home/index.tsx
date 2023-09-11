import Button from "../../components/Button"

import styles from './styles.module.scss'

function Home() {
    return (

        <main className={styles.main}>
            <div className={styles.button}>
                <Button>Jogar</Button>
            </div>
        </main>

    )
}

export default Home