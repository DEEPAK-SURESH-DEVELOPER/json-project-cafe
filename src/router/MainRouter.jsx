import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import GuestRouter from './GuestRouter'
import UserRoute from './UserRoute'

function MainRouter() {
    return (
        <Routes>
            <Route path="/*" element={<GuestRouter />} />
            <Route path="/user/*" element={<UserRoute />} />
            <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
    )
}

export default MainRouter 