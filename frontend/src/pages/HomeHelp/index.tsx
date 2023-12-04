import { Link } from 'react-router-dom'
import styles from './styles.module.scss'
import Button from '../../components/Button'
import { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { setupAPIClient } from '../../services/api';

function HomeHelp() {

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

                <div className={styles.title}>
                    <h1>Ajuda</h1>
                    <hr color='black'></hr>
                </div>

                <div className={styles.links}>
                    <Link to="/home/HelpOne"><button>Dúvida sobre o funcionamento do jogo</button></Link>

                    <Link to="/home/formHelp"><button>Dúvida não encontrada</button></Link>
                </div>

                <div className={styles.buttonBack}>
                    <Link to="/home"><Button>Menu inicial</Button></Link>
                </div>



            </main></>
    )
}

export default HomeHelp