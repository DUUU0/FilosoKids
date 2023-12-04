import styles from './styles.module.scss'
import image from '../../images/Avatar-removebg-preview.png'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import { setupAPIClient } from '../../services/api';

function HelpOne() {

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
                <div className={styles.avatar}>
                    <img src={image} alt="logo" />
                </div>


                <div className={styles.container}>

                    <div className={styles.jump}>
                        <Link to="/home/homeHelp">Pular</Link>
                    </div>

                    <p className={styles.text}>O jogo consiste em perguntas, onde você deve selecionar a que determinar como a correta.</p>

                    <p>Caso erre, será exibida uma explicação da pergunta, depois disso, terá outra chance de responder.</p>
                    

                    <div className={styles.links}>
                        <Link to="/home/helpTwo">Próximo</Link>
                    </div>

                </div>
            </main>
        </>
    )

}

export default HelpOne