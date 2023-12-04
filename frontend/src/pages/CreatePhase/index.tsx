import { FormEvent, useEffect, useState } from "react"

import styles from "./styles.module.scss"

import { toast } from "react-toastify"

import { setupAPIClient } from "../../services/api"

import Input from "../../components/Input"

import Button from "../../components/Button"
import { Link } from "react-router-dom"
import UserService from "../../services/UserService"

function CreatePhase() {

    const [name, setName] = useState('')
    const [number, setNumber] = useState<number | undefined>(undefined)

    const [nameUser, setNameUser] = useState("")

    const apiClient = setupAPIClient()

    async function handleRegister(e: FormEvent) {
        e.preventDefault()

        if (name == "" || number == undefined) {
            return toast.warning("Preencha todos os campos!")
        }
        try {
            const apiClient = setupAPIClient();

            const response = await apiClient.post('/createPhase', {
                name: name,
                number: number
            });

            if (response) {
                setName("")
                setNumber(0)
                toast.success("Cadastrado com sucesso!");
            }
        } catch (error) {
            console.error("Erro ao cadastrar a fase:", error);
            toast.warning("Fase ja existe!.");
        }

    }

    return (

        <>

            <main className={styles.container}>

                <h1>Cadastrar Fase</h1>

                <hr color='black'></hr>

                <div className={styles.createPhase}>
                    <form onSubmit={handleRegister}>

                        <Input
                            placeholder='Digite o nome...'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />

                        <Input
                            placeholder='Digite o número...'
                            type='number'
                            value={number}
                            onChange={(e) => setNumber(parseInt(e.target.value))} />

                        <div className={styles.button}>
                            <Button type='submit'>Cadastrar</Button>
                        </div>

                        <div className={styles.buttonSubmit}>
                            <Link to="/homeAdmin"><Button>Voltar</Button></Link>
                        </div>

                    </form>
                </div>

            </main>
        </>
    )

}

export default CreatePhase