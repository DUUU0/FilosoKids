import { FormEvent, useState } from "react"

import styles from "./styles.module.scss"

import { toast } from "react-toastify"

import { setupAPIClient } from "../../services/api"

import Input from "../../components/Input"

import Button from "../../components/Button"

function CreatePhase() {

    const [name, setName] = useState('')
    const [number, setNumber] = useState<number>(0)

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (name == "") {
            toast.warning("Preencha todos os campos!")
            return
        }

        const apiClient = setupAPIClient()

        await apiClient.post('/createPhase', {
            name: name,
            number: number
        })

        toast.success("Cadastrado com sucesso!")
    }

    return (

        <main className={styles.container}>

            <h1>Cadastrar Fase</h1>

            <div className={styles.createPhase}>
                <form onSubmit={handleRegister}>

                    <Input
                        placeholder='Digite o nome...'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        placeholder='Digite o número...'
                        type='number'
                        value={number}
                        onChange={(e) => setNumber(parseInt(e.target.value))}
                    />

                    <div className={styles.button}>
                        <Button type='submit'>Cadastrar</Button>
                    </div>

                    <div className={styles.buttonSubmit}>
                        <Button>Voltar</Button>
                    </div>

                </form>
            </div>

        </main>
    )

}

export default CreatePhase