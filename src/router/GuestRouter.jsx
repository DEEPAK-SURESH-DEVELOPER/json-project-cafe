import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Guest/Home/Home'
import Menu from '../pages/Guest/Menu/Menu'
import Cart from '../pages/Guest/Cart/Cart'
import Register from '../pages/Guest/Register/Register'
import Login from '../pages/Guest/Login/Login'

function GuestRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default GuestRouter