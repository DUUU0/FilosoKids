import styles from './styles.module.scss'

import { useState, FormEvent } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { setupAPIClient } from '../../services/api'

import { toast } from 'react-toastify'

function SignUp() {

    const [name, setName] = useState('')

    const [nickname, setNickname] = useState('')

    const [password,  setPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (name == "" || nickname == "" || password == "" || confirmPassword == "") {
            toast.warning("Preencha todos os campos!")
            return
        }

        if (password != confirmPassword) {
            toast.warning("Senhas não batem")
            return
        }

        const apiClient = setupAPIClient()

        await apiClient.post('/createUser', {
            name: name,
            nickname: nickname,
            password: password,
        })
    }

    return (
        <main className={styles.containerCenter}>

            <h1>Cadastar</h1>

            <div className={styles.login}>
                <form onSubmit={handleRegister}>
                    <Input
                        placeholder='Digite seu nome...'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <Input
                        placeholder='Confirmar senha...'
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className={styles.button}>
                        <Button type='submit'>Cadastrar</Button>
                    </div>

                </form>
            </div>

        </main>
    )
}

export default SignUp