import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useAsyncValue, Await } from 'react-router-dom'

import { PrivateRoute } from './privateRoutes'
import { DefaultRoutes } from './defaultRoutes'
import { AdminRoute } from './adminRoutes'

import Header from '../components/Header'
import Footer from '../components/Footer'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import HomeAdmin from '../pages/HomeAdmin'
import CreatePhase from '../pages/CreatePhase'
import Welcome from '../pages/Welcome'
import Tutorial from '../pages/Tutorial'
import CreateQuestion from '../pages/CreateQuestion'
import Questions from '../pages/Questions'
import TextIfCorrect from '../pages/TextIfCorrect'
import TextIfIncorrect from '../pages/TextIfIncorrect'
import UpdateRemovePhase from '../pages/UpdateRemovePhase'
import UpdatePhase from '../pages/UpdatePhase'

function RoutesApp() {
    return (
        <BrowserRouter>

            <Header />

            <Routes>

                <Route path='/' element={
                    <DefaultRoutes>
                        <SignIn />
                    </DefaultRoutes>}
                />

                <Route path='/signUp' element={
                    <DefaultRoutes>
                        <SignUp />
                    </DefaultRoutes>}
                />

                <Route path='/bemVindo' element={
                    <PrivateRoute>
                        <Welcome />
                    </PrivateRoute>} />

                <Route path='/tutorial' element={
                    <PrivateRoute>
                        <Tutorial />
                    </PrivateRoute>} />

                <Route path='/home' element={
                    <PrivateRoute>
                        <Outlet />
                    </PrivateRoute>}
                >
                    <Route index element={<Home />} />
                    <Route path='questions' element={<Questions />} />
                    <Route path='questions/textIfCorrect/:id' element={<TextIfCorrect />} />
                    <Route path='questions/textIfIncorrect/:id' element={<TextIfIncorrect />} />
                </Route>

                <Route path='/homeAdmin' element={
                    <PrivateRoute>
                        <Outlet />
                    </PrivateRoute>}
                >
                    <Route index element={<HomeAdmin />} />
                    <Route path='createPhase' element={<CreatePhase />} />
                    <Route path='createQuestion' element={<CreateQuestion />} />
                    <Route path='updateRemovePhase' element={<UpdateRemovePhase />} />
                    <Route path='updatePhase/:id' element={<UpdatePhase />} />
                </Route>

            </Routes>

            <Footer />

        </BrowserRouter>
    )
}

export default RoutesApp