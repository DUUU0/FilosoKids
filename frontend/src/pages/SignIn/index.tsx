import styles from './styles.module.scss'

import { useState, FormEvent, useContext } from 'react'

import Button from '../../components/Button'
import Input from '../../components/Input'

import { AuthContext } from '../../contexts/AuthContext'

import { toast } from 'react-toastify'



function SignIn() {

    const { signIn } = useContext(AuthContext)
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e: FormEvent) {
        e.preventDefault()

        if (nickname == '' || password == '') {
            toast.warning("Preencha todos os campos!")
            return
        }

        let data = {
            nickname,
            password
        }

        await signIn(data)

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