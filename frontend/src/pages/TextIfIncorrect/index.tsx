import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { setupAPIClient } from "../../services/api"
import Button from "../../components/Button"
import styles from './styles.module.scss'
import UserService from "../../services/UserService"

function TextIfIncorrect() {

    const { id } = useParams()

    const [user_id, setUser_id] = useState('')

    const [text, setText] = useState()

    const apiClient = setupAPIClient()

    const [nameUser, setNameUser] = useState("")

    const [showDropdown, setShowDropdown] = useState(false);

    const [numberQuestion, setNumberQuestion] = useState(0)
    const [numberPhase, setNumberPhase] = useState(0)

    const userService = new UserService()

    useEffect(() => {
        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setNameUser(response.data.name)

            setUser_id(response.data.id)

        }

        idUser()

    }, [])

    useEffect(() => {
        async function loadText() {
            const response = await apiClient.get(`/listTextIfIncorrect/${id}`)

            setText(response.data.text_if_incorrect)

            setNumberPhase(response.data.phase.number)
            setNumberQuestion(response.data.number)

        }

        loadText()

    }, [id])

    return (
        <>

            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link to="/home"><img src="/brain.svg" alt="" /></Link>

                    <span>FilosoKids</span>
                </div>
                <div className={styles.center}>
                    <p>Fase: {numberPhase}</p>
                    <p>Questão: {numberQuestion}</p>
                </div>
                <nav className={styles.headerNav}>
                    <img src="/menu.svg" alt="" onClick={() => setShowDropdown(!showDropdown)} />
                    <div className={styles.dropdown} style={{ display: showDropdown ? 'block' : 'none' }}>
                        <div className={styles.user}>
                            <img src="/user (2).svg" alt="" />
                            <span>{nameUser}</span>
                        </div>
                        <Link to="/home/homeHelp"><button>Ajuda</button></Link>
                        <Link to=""><button onClick={userService.logOut}>Sair</button></Link>

                    </div>
                </nav>
            </header>

            <main className={styles.container}>

                <div className={styles.text}>
                    <p>{text}</p>
                </div>

                <div className={styles.button}>
                    <Link to={`/home/questions/${user_id}`}>
                        <Button>Avançar</Button>
                    </Link>
                </div>
            </main>



        </>

    )
}

export default TextIfIncorrect