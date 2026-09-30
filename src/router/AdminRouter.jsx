import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Products from '../pages/adminPages/Products/Products'
import AdminOrders from '../pages/adminPages/Orders/AdminOrders'
import CloudinaryTest from '../components/CloudinaryTest/CloudinaryTest'
import AdminUsers from '../pages/adminPages/Users/AdminUsers'
import AdminDashboard from '../pages/adminPages/Dashboard/AdminDashboard'
import AdminLayout from '../pages/adminPages/AdminLayout/AdminLayout'
function AdminRouter() {
    const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser')
    )

    if (!loggedInUser) {
        return <Navigate to="/login" replace />
    }

    if (loggedInUser.role !== 'admin') {
        return <Navigate to="/user" replace />
    }

    return (
        <Routes>
            <Route element={<AdminLayout />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="/users" element={<AdminUsers />} />
            {/* <Route path="/cloudinary-test" element={<CloudinaryTest />} */}
            </Route>
            
            
        </Routes>
    )
}

export default AdminRouter