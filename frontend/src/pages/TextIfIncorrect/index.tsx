import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { setupAPIClient } from "../../services/api"
import Button from "../../components/Button"

function TextIfIncorrect() {

    const { id } = useParams()

    const [text, setText] = useState()

    const apiClient = setupAPIClient()

    useEffect(() => {
        async function loadText() {
            const response = await apiClient.get(`/listTextIfIncorrect/${id}`)

            setText(response.data.text_if_incorrect)

        }

        loadText()

    }, [id])

    return (
        <>
            <p>{text}</p>

            <Link to="/home/questions">
                <Button>Avançar</Button>
            </Link>
        </>

    )
}

export default TextIfIncorrect