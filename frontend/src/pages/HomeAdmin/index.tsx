import styles from './styles.module.scss'

import Button from '../../components/Button'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { setupAPIClient } from '../../services/api';
import UserService from '../../services/UserService';

function HomeAdmin() {

    const apiClient = setupAPIClient()

    const userService = new UserService()

    return (

        <>
            <main className={styles.container}>
                <div className={styles.buttonRow}>
                    <Link to="/homeAdmin/createPhase"><Button>Cadastrar Fase</Button></Link>
                    <Link to="/homeAdmin/updateRemovePhase"><Button>Editar/Remover Fase</Button></Link>
                </div>
                <div className={styles.buttonRow}>
                    <Link to="/homeAdmin/createQuestion"><Button>Cadastrar Pergunta</Button></Link>
                    <Link to="/homeAdmin/updateRemoveQuestion"><Button>Editar/Remover Pergunta</Button></Link>
                </div>
            </main>
        </>
    )
}

export default HomeAdmin