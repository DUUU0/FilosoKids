import { FormEvent, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { setupAPIClient } from "../../services/api"
import Input from "../../components/Input"
import { toast } from "react-toastify"
import Button from "../../components/Button"


function UpdatePhase() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [number, setNumber] = useState(0)

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
            <h1>Editar</h1>

            <form onSubmit={handleUpdate}> 

                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(parseInt(e.target.value))}
                />

                <Button type='submit'>Cadastrar</Button>

            </form>

        </>
    )
}

export default UpdatePhase