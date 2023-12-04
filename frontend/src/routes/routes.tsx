import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useAsyncValue, Await } from 'react-router-dom'

import { PrivateRoute } from './privateRoutes'
import { DefaultRoutes } from './defaultRoutes'
import { AdminRoute } from './adminRoutes'

import Header from '../components/Header'
import HeaderAdmin from '../components/HeaderAdmin'
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
import UpdateRemoveQuestion from '../pages/UpdateRemoveQuestion'
import UpdateQuestion from '../pages/UpdateQuestion'
import HomeHelp from '../pages/HomeHelp'
import FormHelp from '../pages/FormHelp'
import HelpOne from '../pages/HelpOne'
import HelpTwo from '../pages/HelpTwo'
import HelpLogin from '../pages/HelpLogin'

function RoutesApp() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path='/' element={
                    <>
                        <Header />
                        <DefaultRoutes>
                            <SignIn />
                        </DefaultRoutes></>}
                />

                <Route path='/helpLogin' element={
                    <>
                        <Header />
                        <DefaultRoutes>
                            <HelpLogin />
                        </DefaultRoutes></>}
                />

                <Route path='/signUp' element={
                    <>
                        <Header /><DefaultRoutes>
                            <SignUp />
                        </DefaultRoutes></>}
                />

                <Route path='/bemVindo' element={
                    <>
                        <Header />
                        <PrivateRoute>
                            <Welcome />
                        </PrivateRoute></>}
                />

                <Route path='/tutorial' element={
                    <>
                        <Header />
                        <PrivateRoute>
                            <Tutorial />
                        </PrivateRoute></>}
                />

                <Route path='/home' element={
                    <PrivateRoute>
                        <Outlet />
                    </PrivateRoute>}
                >
                    <Route index element={<Home />} />
                    <Route path='homeHelp' element={<HomeHelp />} />
                    <Route path='formHelp' element={<FormHelp />} />
                    <Route path='helpOne' element={<HelpOne />} />
                    <Route path='helptwo' element={<HelpTwo />} />
                    <Route path='questions/:user_id' element={<Questions />} />
                    <Route path='questions/textIfCorrect/:id' element={<TextIfCorrect />} />
                    <Route path='questions/textIfIncorrect/:id' element={<TextIfIncorrect />} />
                </Route>

                <Route path='/homeAdmin' element={
                    <>
                        <HeaderAdmin />
                        <PrivateRoute>
                            <Outlet />
                        </PrivateRoute></>}
                >
                    <Route index element={<HomeAdmin />} />
                    <Route path='createPhase' element={<CreatePhase />} />
                    <Route path='createQuestion' element={<CreateQuestion />} />
                    <Route path='updateRemovePhase' element={<UpdateRemovePhase />} />
                    <Route path='updatePhase/:id' element={<UpdatePhase />} />
                    <Route path='updateRemoveQuestion' element={<UpdateRemoveQuestion />} />
                    <Route path='updateQuestion/:id' element={<UpdateQuestion />} />
                </Route>

            </Routes>

            <Footer />

        </BrowserRouter>
    )
}

export default RoutesApp