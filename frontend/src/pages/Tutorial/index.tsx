import styles from './styles.module.scss'
import image from '../../images/Avatar-removebg-preview.png'
import { setupAPIClient } from '../../services/api'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Tutorial() {

    const [user_id, setUser_id] = useState('')

    const [isAdmin, setIsAdmin] = useState(false)

    const apiClient = setupAPIClient()

    const navigate = useNavigate()

    useEffect(() => {

        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setUser_id(response.data.id)
            setIsAdmin(response.data.is_admin)

        }

        idUser()

    }, [])

    async function tutorialCompleted() {

        const response = await apiClient.put('/tutorial', {
            user_id: user_id
        })

        if (response && isAdmin) {
            navigate("/homeAdmin")
        } else if (response) {
            navigate("/home")
        }

    }

    return (
        <main className={styles.main}>

            <div className={styles.avatar}>
                <img src={image} alt="logo" />
            </div>

            <div className={styles.container}>
                <p>
                    Filosofia para crianças é um programa de educação formulado por Mattew Lipman, cujo
                    objetivo é ajudar a criança a pensar e expressar logicamente. Ele chama o espaço de aulas de
                    comunidade investigativa. As crianças são postas em círculo para lerem e comentem
                    individualmente sobre o assunto em questão. A leitura do texto é feita em voz alta e, ao término
                    da leitura, o professor se encarrega de fazer uma lista dos assuntos escolhidos por cada aluno
                    e incia-se o debate.
                </p>

                <div className={styles.links}>
                    <div className={styles.conclued}>
                        <a onClick={tutorialCompleted}>Concluir</a>
                    </div>

                    <div className={styles.return}>
                        <Link to="/bemVindo">Voltar</Link>
                    </div>

                </div>


            </div>
        </main>
    )
}

export default Tutorial