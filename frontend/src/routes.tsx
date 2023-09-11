import React from 'react'
import { BrowserRouter, Routes, Route, BrowserRouterProps } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'



function RoutesApp() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    )
}

export default RoutesApp