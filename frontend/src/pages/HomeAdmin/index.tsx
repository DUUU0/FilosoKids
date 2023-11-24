import styles from './styles.module.scss'

import Button from '../../components/Button'
import { Link } from 'react-router-dom'

function HomeAdmin() {
    return (
        <main className={styles.container}>

            <div className={styles.left}>
                <Link to="/homeAdmin/createPhase"><Button>Cadastar Fase</Button></Link>

                <Link to="/homeAdmin/createQuestion"><Button>Cadastar Pergunta</Button></Link>
            </div>

            <div className={styles.right}>

                <Link to="/homeAdmin/updateRemovePhase"><Button>Editar/Remover Fase</Button></Link>

                <Button>Editar/Remover Pergunta</Button>

            </div>

        </main>
    )
}

export default HomeAdmin