import { toast } from "react-toastify"
import { setupAPIClient } from "./api"
import { apiClient } from "./apiClient"

type UserProps = {
    nickname: string
    password: string
}

type AdminProps = {
    nickname: string
    password: string
    isAdmin: boolean
}


class UserService {



    async login(dados: UserProps) {

        const { data } = await apiClient.post("/authUser", dados)

        if (data) {
            sessionStorage.setItem("token", data.token)
            apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

            return data
        }

        return

    }

    isAuthenticated() {
        return sessionStorage.getItem("token") != undefined ? true : false
    }

    logOut() {

        try {
            sessionStorage.removeItem("token")

        } catch (error) {
            console.log("erro ao deslogar");
        }

        return window.location.reload();
    }

    async isAdmin() {

        const apiClient = setupAPIClient()

        const response = await apiClient.get('/detailAdmin')

        return response.data.id != undefined ? true : false;

    }

}

export default UserService