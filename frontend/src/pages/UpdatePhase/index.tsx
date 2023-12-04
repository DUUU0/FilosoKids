import { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { setupAPIClient } from "../../services/api"
import Input from "../../components/Input"
import { toast } from "react-toastify"
import Button from "../../components/Button"

import styles from './styles.module.scss'

function UpdatePhase() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [number, setNumber] = useState<number | undefined>(undefined)

    const apiClient = setupAPIClient()

    const navigate = useNavigate()

    useEffect(() => {
        async function loadPhase() {
            const response = await apiClient.get(`/phase/${id}`)

            setName(response.data.name)
            setNumber(response.data.number)

        }

        loadPhase()

    }, [id])

    async function handleUpdate(e: FormEvent) {
        e.preventDefault()

        if (name === "" || number === undefined) {
            return toast.warning("Preencha todos os campos!")
        }

        const response = await apiClient.put(`/updatePhase/${id}`, {
            name: name,
            number: number
        })

        if (response) {
            toast.success("Alterado com sucesso!")
            navigate("/homeAdmin/updateRemovePhase")
        }
    }

    return (
        <>
            <main className={styles.container}>

                <h1>Editar Fase</h1>

                <hr color='black'></hr>

                <div className={styles.createPhase}>
                    <form onSubmit={handleUpdate}>

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
                            <Button type='submit'>Editar</Button>
                        </div>

                        <div className={styles.buttonSubmit}>
                            <Link to="/homeAdmin/updateRemovePhase"><Button>Voltar</Button></Link>
                        </div>

                    </form>
                </div>

            </main>

        </>
    )
}

export default UpdatePhase