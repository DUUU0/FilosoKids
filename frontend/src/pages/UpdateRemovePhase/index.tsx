import { useEffect, useState } from "react"
import { setupAPIClient } from "../../services/api"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { toast } from "react-toastify"
import styles from './style.module.scss'

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

        const response = await apiClient.delete(`/deletePhase/${id}`)

        if (response) {
            toast.success("Removido com sucesso!")
            setPhases((prevPhases) => prevPhases.filter((phase) => phase.id !== id));
        }

    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.text}>
                    <h1>Editar/ Remover Fase</h1>
                </div>


                <table className={styles.phasestable}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Numero</th>
                            <th>Editar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phases.map((phase) => (
                            <tr key={phase.id}>
                                <td>{phase.name.slice(0, 20)}</td>
                                <td>{phase.number}</td>
                                <td>
                                    <Link to={`/homeAdmin/updatePhase/${phase.id}`}>
                                        <Button className={styles.editbutton}>Editar</Button>
                                    </Link>
                                </td>
                                <td>
                                    <Input
                                        type="submit"
                                        value="Remover"
                                        onClick={() => handleRemove(phase.id)}
                                        className={styles.removebutton}
                                    />

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link to="/homeAdmin" className={styles.backButtonContainer}>
                    <Button className={styles.backbutton}>Voltar</Button>
                </Link>
            </div>
        </>

    )

}

export default UpdateRemovePhase