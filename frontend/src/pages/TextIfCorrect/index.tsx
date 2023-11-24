import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { setupAPIClient } from "../../services/api"
import jwtDecode from "jwt-decode"
import UserService from "../../services/UserService"
import Button from "../../components/Button"
import Input from "../../components/Input"

function TextIfCorrect() {

    const { id } = useParams()

    const [text, setText] = useState()

    const apiClient = setupAPIClient()

    const [token, setToken] = useState('')

    const [user_id, setUser_id] = useState('')

    useEffect(() => {
        async function loadText() {
            const response = await apiClient.get(`/listTextIfCorrect/${id}`)
            setText(response.data.text_if_correct)

        }

        async function idUser() {
            const response = await apiClient.get('/detailUser')

            setUser_id(response.data.id)

        }

        idUser()

        loadText()

    }, [id])

    async function handleConfirm() {
        const response = await apiClient.post(`/sendQuestion/${id}`, {
            data: {
                phase_id: id
            }
        })

        console.log(response);

    }


    return (
        <>
            <h1>{text}</h1>

            <Input
                type="submit"
                onClick={handleConfirm}
            />
        </>
    )
}

export default TextIfCorrect