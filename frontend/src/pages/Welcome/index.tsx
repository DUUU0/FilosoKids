import styles from './styles.module.scss'
import image from '../../images/Avatar-removebg-preview.png'
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <main className={styles.main}>
            <div className={styles.avatar}>
                <img src={image} alt="logo" />
            </div>


            <div className={styles.container}>
                <p>OIá! Eu sou o Eduardo, estou aqui para te ajudar no que precisar. Caso tenha alguma dúvida clique  no ícone que está localizado no canto superior direito, e clique no botão ajuda.</p>

                <p>Você sabe o que é filosofia para criança?</p>


                <p className={styles.next}>Vou te ajudar!</p>

                <div className={styles.links}>
                    <Link to="/tutorial">Próximo</Link>
                </div>

            </div>
        </main>
    )
}

export default Welcome