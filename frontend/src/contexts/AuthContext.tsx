import { createContext, ReactNode, useState, useEffect } from "react";

import jwt from 'jwt-decode'

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from 'nookies'

import { toast } from "react-toastify";

import { Navigate } from 'react-router-dom'
import jwtDecode from "jwt-decode";

type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    nickname: string;
}

type SignInProps = {
    nickname: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}



export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = user!!
    
    async function signIn(){
        alert("cliclou no login")
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}


/*
import axios from "axios";

type UserProps = {
    nickname: string
    password: string
}

class UserAuthenticated {

    async login(dados: UserProps) {
        const { data } = await axios.post("/authUser", dados)

        if (data) {
            localStorage.setItem("nome", data.user.nome)
            localStorage.setItem("nickname", data.user.nickname)
            localStorage.setItem("isAdmin", data.user.isAdmin)
            localStorage.setItem("token", data.token.token)

            return true
        }

        return
    }

    usuarioAutenticado () {
        return localStorage.getItem("token") != undefined ? true : false
      }
}

export default UserAuthenticated
*/