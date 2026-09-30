import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Checkout from '../pages/userPages/Checkout/Checkout'
import Orders from '../pages/userPages/Orders/Orders'
import UserLayout from '../pages/userPages/UserLayout/UserLayout'
import UserProfile from '../pages/userPages/UserProfile/UserProfile'

function UserRoute() {
    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    )

    if (!loggedInUser) {
        return <Navigate to="/login" replace />
    }

    if (loggedInUser.role !== 'user') {
        return <Navigate to="/admin" replace />
    }

    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<UserProfile/>}/>
            </Route>
        </Routes>
    )
}

export default UserRoute