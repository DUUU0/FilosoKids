import { useEffect, useState } from "react"
import { setupAPIClient } from "../../services/api"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { toast } from "react-toastify"

interface PhaseProps {
    id: string
    number: number
    name: string
}


function UpdateRemovePhase() {

    const [phases, setPhases] = useState<PhaseProps[]>([])

    const apiClient = setupAPIClient()

    useEffect(() => {

        async function loadPhases() {
            const response = await apiClient.get('/phaseList')

            setPhases(response.data)

        }

        loadPhases()

    }, [])

    async function handleRemove(id: string) {

        console.log(id);

        const response = await apiClient.delete(`/deletePhase/${id}`)

        if (response) {
            toast.success("Removido com sucesso!")
            setPhases((prevPhases) => prevPhases.filter((phase) => phase.id !== id));
        }

    }


    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Number</th>
            </tr>
            {phases.map((phases) => {
                return (
                    <>
                        <tr key={phases.id}>
                            <td key={phases.id}>{phases.name}</td>
                            <td>{phases.number}</td>
                            <Link to={`/homeAdmin/updatePhase/${phases.id}`}><Button>Editar</Button></Link>
                            <Input
                                type="submit"
                                value="Remover"
                                onClick={() => handleRemove(phases.id)}
                            />
                        </tr>

                    </>
                )
            })}
        </table>


    )
}

export default UpdateRemovePhase