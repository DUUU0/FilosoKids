import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { setupAPIClient } from "../../services/api"
import Input from "../../components/Input"
import UserService from "../../services/UserService"
import styles from './styles.module.scss'

function TextIfCorrect() {

    const { id } = useParams()

    const [text, setText] = useState()

    const apiClient = setupAPIClient()

    const [user_id, setUser_id] = useState('')

    const [nameUser, setNameUser] = useState("")

    const [showDropdown, setShowDropdown] = useState(false);

    const [numberQuestion, setNumberQuestion] = useState(0)
    const [numberPhase, setNumberPhase] = useState(0)

    const userService = new UserService()

    const navigate = useNavigate()

    useEffect(() => {
        async function loadText() {
            const response = await apiClient.get(`/listTextIfCorrect/${id}`)

            setText(response.data.text_if_correct)

            setNumberPhase(response.data.phase.number)
            setNumberQuestion(response.data.number)

        }

        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setUser_id(response.data.id)
            setNameUser(response.data.name)

        }

        idUser()

        loadText()

    }, [id])

    async function handleConfirm() {
        const response = await apiClient.post(`/sendQuestion/${id}`, {
            user_id: user_id,
            question_id: id
        })

        if (response) {
            navigate(`/home/questions/${user_id}`)
        }

    }


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

                <div className={styles.textarea}>
                    <textarea placeholder="Escreva aqui..."></textarea>
                </div>

                <div className={styles.button}>

                    <Input
                        type="submit"
                        onClick={handleConfirm}
                    />

                </div>


            </main>


        </>
    )
}

export default TextIfCorrect