import styles from './styles.module.scss'

import { useState, FormEvent, useContext, useEffect } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { toast } from 'react-toastify'

import UserService from '../../services/UserService'
import { useNavigate } from 'react-router-dom'

function SignIn() {

    const navigate = useNavigate()

    const userService = new UserService()

    const [nickname, setNickname] = useState('')

    const [password, setPassword] = useState('')

    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        const formulario = {
            nickname,
            password
        }

        const response = await userService.login(formulario)

        if (response.tutorial_completed) {
            if (response.isAdmin) {
                toast.success("Logado com sucesso!")
                navigate("/homeAdmin")
            } else {
                toast.success("Logado com sucesso!")
                navigate("/")
            }
        } else {
            toast.success("Logado com sucesso!")
            navigate("/bemVindo")
        }

    }

    return (
        <main className={styles.containerCenter}>

            <h1>Login</h1>

            <div className={styles.login}>

                <form onSubmit={handleLogin}>

                    <Input
                        placeholder='Digite seu apelido...'
                        type='text'
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />

                    <Input
                        placeholder='Digite sua senha...'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className={styles.button}>
                        <Button type='submit'>Login</Button>
                    </div>


                </form>
            </div>

        </main>
    )

}

export default SignIn