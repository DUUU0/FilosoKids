import { useEffect, useState } from "react"
import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"
import Input from "../../components/Input"
import { Link } from "react-router-dom"
import Button from "../../components/Button"
import styles from './styles.module.scss'

interface QuestionsProps {
    id: string
    text: string
    number: string
}

function UpdateRemoveQuestion() {

    const [questions, setQuestions] = useState<QuestionsProps[]>([])

    const apiClient = setupAPIClient()

    useEffect(() => {

        async function loadQuestions() {
            const response = await apiClient.get('/questionsList')

            setQuestions(response.data)

            console.log(response.data);


        }

        loadQuestions()

    }, [])

    async function handleRemove(id: string) {

        const response = await apiClient.delete(`/deleteQuestion/${id}`)

        if (response) {
            toast.success("Removido com sucesso!")
            setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
        }

    }

    return (
        <>
            <div className={styles.container}>

                <div className={styles.text}>
                    <h1>Editar/ Remover Pergunta</h1>
                </div>

                <table className={styles.questionTable}>
                    <thead>
                        <tr>
                            <th>Texto</th>
                            <th>Numero</th>
                            <th>Editar</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question) => {
                            return (
                                <>
                                    <tr key={question.id}>
                                        <td key={question.id}>{question.text.slice(0, 20)}</td>
                                        <td>{question.number}</td>
                                        <td>
                                            <Link to={`/homeAdmin/updateQuestion/${question.id}`}><Button className={styles.editbutton}>Editar</Button></Link>
                                        </td>
                                        <td>
                                            <Input
                                                type="submit"
                                                value="Remover"
                                                onClick={() => handleRemove(question.id)}
                                                className={styles.removebutton} />
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/homeAdmin" className={styles.backButtonContainer}><Button className={styles.backbutton}>Voltar</Button></Link>
            </div>
        </>
    )

}

export default UpdateRemoveQuestion