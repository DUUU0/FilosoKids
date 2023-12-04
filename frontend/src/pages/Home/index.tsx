import Button from "../../components/Button"
import { Link } from "react-router-dom"

import styles from './styles.module.scss'
import { useState, useEffect } from "react"
import { setupAPIClient } from "../../services/api"
import UserService from "../../services/UserService"

function Home() {

    const [user_id, setUser_id] = useState('')

    const [showDropdown, setShowDropdown] = useState(false);

    const [nameUser, setNameUser] = useState("")

    const apiClient = setupAPIClient()

    const userService = new UserService()

    useEffect(() => {

        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setNameUser(response.data.name)

        }

        idUser()

    }, [])

    useEffect(() => {
        async function idUser() {
            const response = await apiClient.get('/detailUser');
            setUser_id(response.data.id);
        }

        idUser();
    }, []);

    return (

        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link to="/home"><img src="/brain.svg" alt="" /></Link>
                    <span>FilosoKids</span>
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

            <main className={styles.main}>
                <div className={styles.button}>
                    <Link to={`questions/${user_id}`}><Button>Jogar</Button></Link>
                </div>
            </main></>

    )
}

export default Home