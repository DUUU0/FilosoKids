import styles from './styles.module.scss'

import { useState, FormEvent } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { setupAPIClient } from '../../services/api'

import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

    const [name, setName] = useState('')

    const [nickname, setNickname] = useState('')

    const [password, setPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (name == "" || nickname == "" || password == "" || confirmPassword == "") {
            toast.warning("Preencha todos os campos!")
            return
        }

        if (password != confirmPassword) {
            toast.warning("Senhas diferentes!")
            return
        }

        try {
            const apiClient = setupAPIClient()

            const response = await apiClient.post('/createUser', {
                name: name,
                nickname: nickname,
                password: password
            })
    
            if (response) {
                navigate("/")
                toast.success("Cadastrado com sucesso!")
            }

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            toast.warning("Apelido já existe!");
        }

    }

    return (
        <main className={styles.containerCenter}>

            <h1>Cadastar</h1>

            <hr color='black'></hr>

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

            <hr color='black'></hr>

            <div className={styles.signIn}>
                <p>Já possui conta?</p>
                <Link to="/"><button>Login</button></Link>
            </div>

        </main>
    )
}

export default SignUp