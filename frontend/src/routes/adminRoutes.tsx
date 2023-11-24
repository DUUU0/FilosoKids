import { Navigate, useAsyncValue } from "react-router-dom"
import UserService from "../services/UserService"
import { setupAPIClient } from "../services/api"

export const AdminRoute = async ({ children }: { children: JSX.Element }) => {

    const user = new UserService()

    const isAuthenticated = user.isAuthenticated()

    const isAdmin = await user.isAdmin()

    return isAuthenticated && isAdmin ? children : <Navigate to={"/signIn"} />

}


