import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../../components/AdminComponents/AdminHeader/AdminHeader'
import AdminSidebar from '../../../components/AdminComponents/AdminSidebar/AdminSidebar'
import styles from './AdminLayout.module.css'

function AdminLayout() {
    return (
        <div className={styles.adminLayout}>
            <AdminSidebar />

            <div className={styles.contentArea}>
                <AdminHeader />

                <main className={styles.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout