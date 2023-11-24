import { Navigate } from "react-router-dom"
import UserService from "../services/UserService"

export const DefaultRoutes = ({ children }: { children: JSX.Element }) => {

    const userAuthenticated = new UserService()

    const isAuthenticated = userAuthenticated.isAuthenticated() === false

    return isAuthenticated ? children : <Navigate to={"/home"} />

}