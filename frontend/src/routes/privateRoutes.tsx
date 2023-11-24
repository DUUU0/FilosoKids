import { Navigate } from "react-router-dom"
import UserService from "../services/UserService"

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const userAuthenticated = new UserService()

    const isAuthenticated = userAuthenticated.isAuthenticated()

    return isAuthenticated ? children : <Navigate to={"/"} />

}