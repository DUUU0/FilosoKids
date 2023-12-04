import { useEffect, useState } from 'react';
import styles from './styles.module.scss'

import { Link } from 'react-router-dom'
import { setupAPIClient } from '../../services/api';
import UserService from '../../services/UserService';

function HeaderAdmin() {

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
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link to="/homeAdmin"><img src="/brain.svg" alt="" /></Link>

                <span>FilosoKids</span>
            </div>
            <nav className={styles.headerNav}>
                <img src="/menu.svg" alt="" onClick={() => setShowDropdown(!showDropdown)} />
                <div className={styles.dropdown} style={{ display: showDropdown ? 'block' : 'none' }}>
                    <div className={styles.user}>
                        <img src="/user (2).svg" alt="" />
                        <span>{nameUser}</span>
                    </div>
                    <Link to=""><button onClick={userService.logOut}>Sair</button></Link>

                </div>
            </nav>
        </header>
    )
}

export default HeaderAdmin